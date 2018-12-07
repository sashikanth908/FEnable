# frozen_string_literal: true

class API::V1::LateTimeOutReasonsController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers

  api :GET, '/v1/late_time_out_reasons', 'Get  all late_time_out_reasons'
  description 'Returns all late_time_out reasons'
  param :page, String, desc: 'Page number to show'
  param :per_page, String, desc: 'per_page number of categories to show'
  def index
    authorize LateTimeOutReason
    @late_time_out_reasons = LateTimeOutReason.where(company_id: current_user.company_id).desc(:created_at)
    render json:  pagination(@late_time_out_reasons),
           serializer: PaginationSerializer,
           status: :ok
  end
end
