# frozen_string_literal: true

class API::V1::UsersController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include CheckInsList
  include PunchesList
  include TracksList

  api :GET, '/v1/users', 'Get all users'
  description 'Show the users of a company'
  def index
    authorize User
    users = policy_scope(User).desc(:first_name)
    search = params[:search] || ''
    if search.present?
     term_regexp = /^#{Regexp.escape(search)}/i
     users = users.and('$or' => [{ email: term_regexp }, { first_name: term_regexp }, { last_name: term_regexp}, { mobile_number: term_regexp}])
    end
    render json: pagination(users),
           each_serializer: UserShortSerializer,
           serializer: PaginationSerializer,
           status: :ok, status: :ok
  end

  api :GET, '/v1/users/:id', 'Get User'
  description 'Shows the users whose id is selected'
  param :id, String, desc: 'name of the user', required: true
  def show
    user = User.find(params[:id])
    authorize user
    render json: user, root: false, status: :ok
  end

  api :GET, '/v1/users/me', 'Get present logged in user'
  description 'Gets the present user that is logged in the application'
  def me
    user = current_user
    authorize user
    render json: user, root: false, status: :ok
  end

  api :POST, '/v1/users', 'Create User'
  description 'Creates a new User'
  param :company_id, String, desc: 'id of the company', required: true
  param :first_name, String, desc: 'first name of the user', required: true
  param :last_name, String, desc: 'last name of the user'
  param :middle_name, String, desc: 'middle name of the user'
  param :mobile_number, String, desc: 'mobile number of the user'
  param :work_location, String, desc: 'work_location of the user'
  param :designation, String, desc: 'designation of the user'
  param :image, File, desc: 'profile image'
  param :email, String, desc: 'email of the user', required: true
  param :password, String, desc: 'password of the user', required: true
  param :password_confirmation, String, desc: 'password_confirmation of the user', required: true
  param :address, Array, desc: 'Address of the user' do
    param :latitude, Float, desc: 'latitude of the address'
    param :longitude, Float, desc: 'longitude of the address'
    param :address_line1, String, desc: 'located in this address'
    param :address_line2, String, desc: 'located near to this address'
    param :zipcode, String, desc: 'located with this zipcode'
    param :city, String, desc: 'located in this  city'
    param :state, String, desc: 'located in this country'
    param :country, String, desc: 'located in this country'
  end
  def create
    user = User.new(user_params)
    authorize user
    if user.save
      user.send_welcome_message
      render json: user, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  api :PUT, '/v1/users/:id', 'Updating a User'
  description 'Updates the user whose id is selected'
  param :id, String, desc: 'id of the user', required: true
  param :first_name, String, desc: 'first name of the user', required: true
  param :last_name, String, desc: 'last name of the user'
  param :middle_name, String, desc: 'middle name of the user'
  param :mobile_number, String, desc: 'mobile number of the user'
  param :image, File, desc: 'profile image'
  param :email, String, desc: 'email of the user'
  param :work_location, String, desc: 'work_location of the user'
  param :designation, String, desc: 'designation of the user'
  param :address, Hash, desc: 'Address of the user' do
    param :latitude, Float, desc: 'latitude of the address'
    param :longitude, Float, desc: 'longitude of the address'
    param :address_line1, String, desc: 'located in this address'
    param :address_line2, String, desc: 'located near to this address'
    param :zipcode, String, desc: 'located with this zipcode'
    param :city, String, desc: 'located in this  city'
    param :state, String, desc: 'located in this country'
    param :country, String, desc: 'located in this country'
  end
  def update
    user = User.find(params[:id])
    authorize user
    if user.update_attributes(user_params)
      render json: user, root: false, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  api :DELETE, '/v1/users/:id', 'Destroys a user'
  description 'Destroys a user'
  param :id, String, desc: 'user Id', required: true
  def destroy
    user = User.find(params[:id])
    authorize user
    # this is important for user re-creation
    user.deleted_at = Time.now
    if user.save
      render json: user, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  api :GET, '/v1/users/history', 'Get all history of check_ins,punches,tracks '
  description 'Get the all history'
  param :user_id, String, desc: 'user_id  to get history of that user'
  param :date, Date, desc: 'history to that date', required: true
  param :time_zone, String, desc: 'To get timezone based list', required: true
  def history
    authorize User
    date = DateTime.parse(params[:date])
    time_zone = params[:time_zone]
    if time_zone.present?
      t = Time.now.in_time_zone(time_zone).to_datetime
      offset = t.offset
      @tracks = get_tracks_with_timezone(date, offset)
      @check_ins = get_check_ins_with_timezone(date, offset)
      @punches = get_punches_with_timezone(date, offset)
    else
      @tracks = get_tracks(date)
      @check_ins = get_check_ins(date)
      @punches = get_punches(date)
    end
    render json: { tracks: ActiveModel::ArraySerializer.new(@tracks,
                                                            each_serializer: TrackSerializer).as_json,
                   punches: ActiveModel::ArraySerializer.new(@punches,
                                                             each_serializer: PunchSerializer).as_json,
                   check_ins: ActiveModel::ArraySerializer.new(@check_ins,
                                                               each_serializer: CheckInSerializer).as_json
    }, status: :ok
  end

  api :GET, '/v1/users/users_latest_tracks', 'Get latest track of all users in last 2 hours'
  description 'Get latest track of all users in last 2 hours'
  def users_latest_tracks
    authorize User, :history?
    tracks = Track.in(user_id: current_user.company.users.pluck(:id)).where(:date_time.gt => 2.hours.ago)
    tracks = Aggregation.new(tracks)
                        .sort(
                          { created_at: -1 }.freeze
                        )
                        .group(
                          _id: '$user_id',
                          latitude: { '$first' => '$latitude' },
                          longitude: { '$first' => '$longitude' },
                          created_at: { '$first' => '$created_at' },
                          updated_at: { '$first' => '$updated_at' },
                          date_time: { '$first' => '$date_time' }
                        ).aggregates!

    render json: { tracks: tracks }, status: :ok
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :middle_name, :mobile_number,
                  :email, :password, { _roles: {} }, :company_id, :image, :work_location, :designation,
                  :password_confirmation, address: %i(latitude longitude address_line1 address_line2 zipcode city state country))
  end
end
