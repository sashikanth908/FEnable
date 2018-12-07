# frozen_string_literal: true

class API::V1::CategoriesController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include CategoriesList

  api :GET, '/v1/categories', 'Get  all Categories'
  description 'Returns all categories'
  param :page, String, desc: 'Page number to show'
  param :per_page, String, desc: 'per_page number of categories to show'
  def index
    authorize Category
    @categories = get_categories(current_user.company_id)
    render json:  pagination(@categories),
           serializer: PaginationSerializer,
           status: :ok
  end
end
