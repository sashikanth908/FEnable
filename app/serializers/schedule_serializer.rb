# frozen_string_literal: true

class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :date_time, :check_in_id
  has_one :business, serializer: BusinessSerializer
end