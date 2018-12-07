# frozen_string_literal: true

require 'doorkeeper/helpers'

class API::ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection # for verify_authenticity_token and protect_from_forgery
  include Pundit

  protect_from_forgery with: :exception
  before_action :cors_headers
  before_action :doorkeeper_authorize
  after_action :verify_authorized
  after_action :sign_out_token_user

  skip_before_action :verify_authenticity_token#, if: :bearer_in_header

  rescue_from Mongoid::Errors::DocumentNotFound, with: :record_not_found
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from Pundit::NotDefinedError, with: :record_not_found

  def from_date
    if params[:from_date].present?
      Date.parse(params[:from_date]).beginning_of_day
    else
      Time.zone.today.beginning_of_day
    end
  end

  def to_date
    if params[:to_date].present?
      Date.parse(params[:to_date]).end_of_day
    else
      Time.zone.today.end_of_day
    end
  end

  def ist_time(time)
    time.in_time_zone(TZInfo::Timezone.get('Asia/Kolkata'))
  end

  protected

  def cors_headers
    headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE'
    default_request_headers = 'Origin, Authorization, Accept, Content-Type'
    allow_headers = request.headers['Access-Control-Request-Headers'] || default_request_headers
    headers['Access-Control-Allow-Headers'] = allow_headers
    headers['Access-Control-Allow-Credentials'] = 'true'
  end

  private

  def user_not_authorized
    render json: { errors: [I18n.t("not_authorized.default")] }, status: :unauthorized
  end

  def render_unprocessable_error(errors)
    render json: { errors: errors }, status: :unprocessable_entity
  end

  def record_not_found
    render json: { errors: [I18n.t("record_not_found")] }, status: :not_found
  end
end
