# frozen_string_literal: true

class API::AuthenticationController < ActionController::API
  include AbstractController::Translation

  before_action :client_params, only: [:send_verification_code, :verify_otp]

  before_action :oauth_application, only: %i(user_access_token)

  api :POST, '/authentication/send_verification_code', 'Send mobile verification code'
  description 'Sends a verification code to mobile'
  param :client_id, String, desc: 'Client ID', required: true
  param :client_secret, String, desc: 'Client secret', required: true
  param :mobile_number, String, desc: 'Mobile number', required: true
  param :company_id, String, desc: 'Id of the company', required: false
  def send_verification_code
    render json: { error: t('errors.invalid_client') }, status: :forbidden and return if oauth_application.blank?

    users = User.active
    users = users.where(company_id: params[:company_id]) if params[:company_id].present?
    user = users.where(mobile_number: params[:mobile_number]).first

    render json: { error: t('errors.mobile_not_found') }, status: :not_found and return if user.nil?

    verification = UserVerificationCode.verification_code(params[:mobile_number], [user.id])
    verification.send_sms(user.company)

    render json: {}, status: :ok
  end

  api :POST, '/authentication/verify_otp', 'Verify OTP code'
  description 'Verifies OTP and returns authentication tokens'
  param :client_id, String, desc: 'Client ID', required: true
  param :client_secret, String, desc: 'Client secret', required: true
  param :mobile_number, String, desc: 'Mobile number', required: true
  param :otp, String, desc: 'One time password', required: true
  param :os_version, String, desc: 'Version of OS'
  param :os_type, String, desc: 'Type of OS'
  param :device_name, String, desc: 'Name of the devise'
  param :device_token, String, desc: 'Token of a devise', required: true
  def verify_otp
    if params[:device_token].blank?
      render json: { error: t('errors.field_required', field: 'device_token') }, status: :unprocessable_entity and return
    end
    render json: { error: t('errors.invalid_client') }, status: :forbidden and return if oauth_application.blank?

    verification = UserVerificationCode.verify_otp(params[:mobile_number], params[:otp])
    render json: { error: t('errors.invalid_otp') }, status: :unprocessable_entity and return if verification.blank?

    users = User.active.in(id: verification.user_ids).includes(:company)
    tokens = []
    users.each do |user|
      expire_tokens(user.id)
      user.mobile_registrations.create(mobile_reg_params)
      tokens << user_token(user)
    end

    render json: { auth_tokens: tokens }, status: :ok
  end

  api :POST, '/authentication/user_access_token', 'Get user access token'
  description 'Returns user access token and refresh tokens'
  param :client_id, String, desc: 'Client ID', required: true
  param :client_secret, String, desc: 'Client secret', required: true
  param :scopes, String, desc: 'Space-delimited list of requested scopes. Default scope is API'
  param :username, String, desc: 'Username of user', required: true
  param :password, String, desc: 'Password of user', required: true
  def user_access_token
    if oauth_application.blank?
      render json: { error: 'Invalid client credentials' }, status: :forbidden
      return
    end

    unless (user = User.authenticate(params['username'], params['password']))
      render json: { error: 'Invalid user credentials' }, status: :forbidden
      return
    end

    token = Doorkeeper::AccessToken.find_or_create_for(oauth_application, user.id,
                                                       valid_oauth_scopes,
                                                       Doorkeeper.configuration.access_token_expires_in || 604_800,
                                                       Doorkeeper.configuration.refresh_token_enabled?)

    render json: token_as_json(token), status: :ok
  end

  api :POST, '/authentication/forgot_password', 'Forgot Password'
  description 'Get forgot password mail to the respective email'
  param :email, String, desc: 'Email ID', required: true
  def forgot_password
    email = params[:email]&.strip
    if email.present?
      user = User.where(email: email).first
      if user.present?
        user.send_reset_password_instructions
        render json: {}, status: :ok
      else
        render json: { error: 'User not found' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Please provide valid email' }, status: :unprocessable_entity
    end
  end

  private

  def oauth_application
    @oauth_application ||= Doorkeeper::Application.where(uid: params['client_id'],
                                                         secret: params['client_secret']).first
  end

  def client_params
    @client_id ||= params[:client_id]
    @client_secret ||= params[:client_secret]
  end

  def valid_oauth_scopes
    scopes = params['scopes'].presence || Doorkeeper.configuration.default_scopes.to_s
    (scopes.split(' ').compact & oauth_application.scopes.to_a).join(' ')
  end

  def user_token(user)

    expires_in =  Doorkeeper.configuration.access_token_expires_in || 7200
    use_refresh_token = Doorkeeper.configuration.refresh_token_enabled?
    scopes = Doorkeeper.configuration.default_scopes.to_s

    # TODO - use refresh token not working, creating new token every time. Need to fix that
    token = Doorkeeper::AccessToken.find_or_create_for(oauth_application, user.id,
                                                       scopes, expires_in, use_refresh_token)

    {
        id: user.id.to_s,
        organization_name: user&.company&.name,
        token: token_as_json(token)
    }
  end

  def token_as_json(token)
    token_json = {
        access_token: token.token,
        token_type: 'bearer',
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        created_at: token.created_at.to_i,
        scopes: token.scopes,
        user_id: token.resource_owner_id
    }

    token_json
  end

  def expire_tokens(resource_owner_id)
    resource_tokens = ::Doorkeeper::AccessToken.where(resource_owner_id: resource_owner_id)
    resource_tokens.update_all(revoked_at: Time.now)
  end

  def mobile_reg_params
    params.permit(:os_version, :os_type, :device_name, :device_token)
  end
end
