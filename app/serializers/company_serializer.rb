# frozen_string_literal: true

class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :company_time_in, :company_time_out, :revisit, :default_category_id
  has_one :address, serializer: AddressSerializer
  has_many :categories, serializer: CategorySerializer
  has_many :call_results, serializer: CallResultSerializer
  has_many :check_out_reasons, serializer: CheckOutReasonSerializer
  has_many :late_time_out_reasons, serializer: LateTimeOutReasonSerializer
  def revisit
    object.revisit ? 1 : 0
  end
end
