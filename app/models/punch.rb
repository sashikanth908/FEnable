# frozen_string_literal: true

class Punch
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  include Mongoid::Search

  field :punch_in_datetime, type: DateTime
  field :punch_in_latitude, type: Float
  field :punch_in_longitude, type: Float
  field :punch_in_timezone, type: String
  field :punch_out_datetime, type: DateTime
  field :punch_out_latitude, type: Float
  field :punch_out_longitude, type: Float
  field :punch_out_timezone, type: String
  field :time_in, type: Boolean
  field :punch_id, type: String
  field :late_timeout_reason_id, type: String

  index({ punch_id: 1 }, unique: true)
  index({ user: 1 })
  index({ punch_in_datetime: 1, punch_out_datetime: 1 }, background: true)
  index({ created_at: -1 }, background: true)

  validates :punch_in_datetime, presence: true
  validates :punch_in_latitude, presence: true
  validates :punch_in_longitude, presence: true
  validates :time_in, presence: true
  validates :punch_id, presence: true, uniqueness: true

  search_in :punch_id, user: %i(first_name last_name email)

  belongs_to :user
end
