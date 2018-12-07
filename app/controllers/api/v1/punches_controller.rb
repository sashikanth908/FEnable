# frozen_string_literal: true

class API::V1::PunchesController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include PunchesList

  api :GET, '/v1/punches', 'Get all Punches'
  description 'Get the all Punches '
  param :user_id, String, desc: 'user_id of the Punches'
  param :date, Date, desc: 'date of punch_in', required: true
  def index
    authorize Punch
    date = Date.parse(params[:date])
    time_zone = params[:time_zone]
    if time_zone
      t = Time.now.in_time_zone(time_zone).to_datetime
      offset = t.offset
      @punches = get_punches_with_timezone(date, offset)
    else
      @punches = get_punches(date)
    end
    render json: pagination(@punches),
            serializer: PaginationSerializer,
            status: :ok
  end

  api :POST, '/v1/punches', 'Create Punch'
  description 'Creates a new Punch'
  param :data, Array, desc: 'array of punches' do
    param :latitude, Float, desc: 'Latitude', required: true
    param :longitude, Float, desc: 'longitude', required: true
    param :date_time, DateTime,
          desc: 'date_time in `YYYY-MM-DD HH:MM:SS ZONE` format (eg: 2018-03-29 7:43:00 +05:30)',
          required: true
    param :time_in, Boolean, desc: 'time_in must be 0 or 1'
    param :punch_id, String, desc: 'unique id of punch'
    param :late_timeout_reason_id, String, desc: 'reason for late time out'
  end
  def create
    authorize Punch, :create?
    punches = params[:data]
    @errors = []
    punches.each do |p|
      date_time = p[:date_time].to_datetime
      time_in = p[:time_in].to_i == 1
      if time_in
        punch = Punch.new(user: current_user, time_in: p[:time_in], punch_id: p[:punch_id],
                          punch_in_datetime: p[:date_time], punch_in_timezone: date_time.zone,
                          punch_in_latitude: p[:latitude], punch_in_longitude: p[:longitude])
      else
        punch = current_user.punches.where(punch_id: p[:punch_id]).first
        # TODO: need to throw error when no valid time_in found while doing time_out
        next unless punch
        punch.time_in = p[:time_in]
        punch.punch_out_datetime = p[:date_time]
        punch.punch_out_latitude = p[:latitude]
        punch.punch_out_longitude = p[:longitude]
        punch.late_timeout_reason_id = p[:late_timeout_reason_id]
        punch.punch_out_timezone = date_time.zone
      end
      # @errors << punch.errors.full_messages unless punch.save
      if punch.valid?
        punch.save
      else
        logger.error ##########  Punch Error ###########
        logger.error punch.errors.full_messages
        logger.error ####### Punch Object ########
        logger.error punch
        logger.error ######### End of Punch Error#######
      end

      #@errors << business.errors.full_messages unless business.save
    end
    if @errors.empty?
      render json: { message: 'successfully saved' }, status: :ok
    else
      render json: { errors: @errors }, status: :ok
    end
  end

  api :GET, '/v1/punches/list', 'Get all punches of a company'
  description 'Shows all punches of a current user company'
  param :from_date, String, desc: 'Beginning of queryable range in YYYY-MM-DD format', required: true
  param :to_date, String, desc: 'End of queryable range in YYYY-MM-DD format', required: true
  param :user_id, String, desc: 'id of the user to get user punches', required: false
  param :_keywords, String, desc: 'search punches with first_name, last_name, email', required: false
  def list
    authorize Punch, :list?
    company = current_user.company
    if params[:user_id].present?
      user_ids = User.where(id: params[:user_id], company_id: company.id).pluck(:id)
    else
      user_ids = company.users.pluck(:id)
    end
    punches = Punch.in(user_id: user_ids).where(punch_in_datetime: from_date..to_date).desc(:punch_in_datetime)
    if params[:_keywords].present?
      punches = punches.full_text_search(params[:_keywords], match: :all)
      render json: punches, status: :ok
    else
     render json: pagination(punches),
           serializer: PaginationSerializer,
           status: :ok
     end
  end
end
