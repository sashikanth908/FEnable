# frozen_string_literal: true

class PunchSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :punch_in_latitude, :punch_in_longitude, :punch_in_datetime, :punch_in_timezone, :time_in,
             :punch_id, :punch_out_latitude, :punch_out_longitude, :punch_out_datetime, :late_timeout_reason_id,
             :time_out_reason_value, :punch_out_timezone
  has_one :user, serializer: UserShortSerializer

  def time_in
    object.time_in ? 1 : 0
  end
  def time_out_reason_value
    object.late_timeout_reason_id ? LateTimeOutReason.where(id: object.late_timeout_reason_id).first&.name : ''
  end
end

