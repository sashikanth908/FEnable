# frozen_string_literal: true

class TrackSerializer < ActiveModel::Serializer
  attributes :id, :track_id, :latitude, :longitude, :date_time
end