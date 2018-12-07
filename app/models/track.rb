# frozen_string_literal: true

class Track
  include Mongoid::Document
  field :date_time, type: DateTime
  field :latitude, type: Float
  field :longitude, type: Float
  field :track_id, type: String
  validates :date_time, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  # validates :track_id, presence: true
  belongs_to :user
end
