# frozen_string_literal: true

class Schedule
  include Mongoid::Document
  include Mongoid::Timestamps
  # include Mongoid::Paranoia
  field :date_time, type: DateTime
  field :check_in_id, type: String
  belongs_to :Business
end