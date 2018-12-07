# frozen_string_literal: true

class API::V1::CallResultsController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include CallResultsList

  api :GET, '/v1/call_results', 'Get  all call_results'
  description 'Returns all call_results'
  param :page, String, desc: 'Page number to show'
  param :per_page, String, desc: 'per_page number of callresults to show'
  def index
    authorize CallResult
    @call_results = get_call_results(current_user.company_id)
    render json:  pagination(@call_results),
           serializer: PaginationSerializer,
           status: :ok
  end
end
