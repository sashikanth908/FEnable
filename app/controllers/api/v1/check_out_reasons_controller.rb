# frozen_string_literal: true

class API::V1::CheckOutReasonsController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers

  api :GET, '/v1/check_out_reasons', 'Get  all check_out_reasons'
  description 'Returns all check_out reasons'
  param :page, String, desc: 'Page number to show'
  param :per_page, String, desc: 'per_page number of categories to show'
  def index
    authorize CheckOutReason
    @check_out_reasons = CheckOutReason.where(company_id: current_user.company_id).desc(:created_at)
    render json:  pagination(@check_out_reasons),
           serializer: PaginationSerializer,
           status: :ok
  end
end