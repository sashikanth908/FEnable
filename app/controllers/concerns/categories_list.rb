# frozen_string_literal: true

module CategoriesList
  extend ActiveSupport::Concern
  def get_categories(company_id)
    Category.where(company_id: company_id)
  end
end
