# frozen_string_literal: true

class API::V1::CheckInsController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include CheckInsList

  api :GET, '/v1/check_ins', 'Get all check_ins'
  description 'Get the all check_ins'
  param :user_id, String, desc: 'user_id of the check_ins'
  param :date, Date, desc: 'date of check_in', required: true
  def index
    authorize CheckIn
    date = Date.parse(params[:date])
    time_zone = params[:time_zone]
    if time_zone
      t = Time.now.in_time_zone(time_zone).to_datetime
      offset = t.offset
      @check_ins = get_check_ins_with_timezone(date , offset)
    else
      @check_ins = get_check_ins(date)
    end
    render json: pagination(@check_ins),
           serializer: PaginationSerializer ,
           status: :ok
  end

  api :POST, '/v1/check_ins', 'Create CheckIn'
  description 'Creates a new CheckIn'
  param :data, Array, desc: 'To add  details in array of objects' do
    param :latitude, Float, desc: 'Latitude', required: true
    param :longitude, Float, desc: 'longitude', required: true
    param :date_time, DateTime, desc: 'date_time', required: true
    param :check_in, Boolean, desc: 'check_in must be 0 or 1', required: true
    param :check_in_id, String, desc: 'check_in id', required: true
    param :call_result_id, String, desc: 'id of call_result', required: true
    param :check_out_reason_id, String, desc: 'id of check_out_reason'
    param :comments, String, desc: 'comments'
    param :revisit, Boolean, desc: 'revisit must be 0 or 1', required: true
    param :revisit_date, Date, desc: 'revisit Date'
    param :check_in_business_id, String, desc: 'id of the Business', required: true
  end
  def create
    authorize CheckIn, :create?
    check_ins = params[:data]
    @errors = []
    check_ins.each do |user_check_in|
      date_time = user_check_in[:date_time].to_datetime
      punch = current_user.punches.
          where(:punch_in_datetime.gte => Time.zone.now.beginning_of_day - date_time.utc_offset).first
      @errors << "No punch in found for check_in: #{user_check_in[:check_in_id]}" and next if punch.nil?
      business = Business.where(business_id: user_check_in[:check_in_business_id]).first
      @errors << "Invalid business for check_in: #{user_check_in[:check_in_id]}" and next if business.nil?
      is_check_in = user_check_in[:check_in].to_i == 1
      check_in = if is_check_in
                   CheckIn.new(user: current_user, check_in_id: user_check_in[:check_in_id], business: business,
                               check_in_business_id: user_check_in[:check_in_business_id])
                 else
                   CheckIn.where(check_in_id: user_check_in[:check_in_id]).first
                 end
      if check_in
        check_in.check_in = user_check_in[:check_in]
        if is_check_in
          check_in.check_in_datetime = user_check_in[:date_time]
          check_in.check_in_latitude = user_check_in[:latitude]
          check_in.check_in_longitude = user_check_in[:longitude]
          check_in.check_in_timezone = date_time.zone
        else
          check_in.check_out_datetime = user_check_in[:date_time]
          check_in.check_out_latitude = user_check_in[:latitude]
          check_in.check_out_longitude = user_check_in[:longitude]
          check_in.check_out_timezone = date_time.zone
          check_in.call_result_id = user_check_in[:call_result_id]
          check_in.check_out_reason_id = user_check_in[:check_out_reason_id]
          check_in.revisit = user_check_in[:revisit]
          check_in.comments = user_check_in[:comments]
          check_in.revisit_date = user_check_in[:revisit_date]
        end
        if check_in.valid?
          check_in.save
        else
          logger.error ##########  Check_in Error ###########
          logger.error check_in.errors.full_messages
          logger.error ####### Check_in Object ########
          logger.error user_check_in
          logger.error ######### End of Check_in Error#######
        end

        #@errors << business.errors.full_messages unless business.save
      else
        @errors << "Invalid Check In: #{user_check_in[:check_in_id]}"
        end
    end
    if @errors.empty?
      render json: { message: 'successfully saved' }, status: :ok
    else
      render json: { errors: @errors }, status: :ok
    end
  end

  api :GET, '/v1/check_ins/list', 'Get all the checkins of a company'
  description 'Shows the all checkins of a current user company'
  param :from_date, String, desc: 'Beginning of queryable range in YYYY-MM-DD format', required: true
  param :to_date, String, desc: 'End of queryable range in YYYY-MM-DD format', required: true
  param :user_id, String, desc: 'id of the user to get user check_ins', required: false
  param :_keywords, String, desc: 'search punches with first_name, last_name, email', required: false
  def list
    authorize CheckIn, :list?
    company = current_user.company
    if params[:user_id].present?
      user_ids = User.where(id: params[:user_id], company_id: company.id).pluck(:id)
    else
      user_ids = company.users.pluck(:id)
    end
    check_ins = CheckIn.in(user_id: user_ids).where(check_in_datetime: from_date..to_date).includes(:user).desc(:check_in_datetime)
    if params[:_keywords].present?
      check_ins = check_ins.full_text_search(params[:_keywords], match: :all)
      render json: check_ins, status: :ok
    else
      render json: pagination(check_ins),
             serializer: PaginationSerializer,
             status: :ok
    end
  end

  api :GET, 'v1/check_in/revisits', 'Get the revisit checkins of an user'
  description 'Lists all the revisit checkins of current user'
  param :from_date, String, desc: 'Beginning of queryable range in YYYY-MM-DD format'
  def revisits
    authorize CheckIn, :revisits?
    check_ins = current_user.check_ins.where(revisit: 1, :revisit_date.gte => from_date)
    render json: check_ins, status: :ok
  end
end
