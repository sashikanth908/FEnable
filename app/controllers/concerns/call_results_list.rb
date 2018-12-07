# frozen_string_literal: true

module CallResultsList
  extend ActiveSupport::Concern
  def get_call_results(company_id)
    CallResult.where(company_id: company_id)
  end
end
