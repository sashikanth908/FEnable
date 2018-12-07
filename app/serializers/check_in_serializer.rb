# frozen_string_literal: true

class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :check_in_latitude, :check_in_longitude, :check_in_datetime, :check_in_timezone,
             :check_out_latitude, :check_out_longitude, :check_out_datetime, :check_in_business_id,
             :check_in, :comments, :check_in_id, :revisit, :revisit_date, :check_out_timezone,
             :call_result_id, :call_result_value, :check_out_reason_id, :check_out_reason_value
  has_one :user, serializer: UserShortSerializer
  has_one :business, serializer: BusinessSerializer, only: %i(id name phone_number address nickname username)

  def check_in
    object.check_in ? 1 : 0
  end

  def revisit
    object.revisit ? 1 : 0
  end

  def call_result_value
    object.call_result_id ? CallResult.where(id: object.call_result_id).first&.name : ''
  end

  def check_out_reason_value
    object.check_out_reason_id ? CheckOutReason.where(id: object.check_out_reason_id).first&.name : ''
  end
end
