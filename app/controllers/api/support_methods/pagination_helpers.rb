# frozen_string_literal: true

module API::SupportMethods::PaginationHelpers
  extend ActiveSupport::Concern
  def pagination(records)
    @pagination ||= Kaminari.paginate_array(records).page(params[:page]).per(params[:per_page])
  end
end
