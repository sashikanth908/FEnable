# frozen_string_literal: true

class API::V1::MasterMindsController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers
  include CategoriesList
  include CallResultsList

  def index
    authorize Category
    @categories = get_categories
    @responses = get_responses
    render json: { categories: ActiveModel::ArraySerializer.new(@categories,
                                                            each_serializer: CategorySerializer).as_json,
                   responses: ActiveModel::ArraySerializer.new(@responses,
                                                             each_serializer: CallResultSerializer).as_json
    }, status: :ok
  end
end