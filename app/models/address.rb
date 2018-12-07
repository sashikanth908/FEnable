# frozen_string_literal: true

class Address
  include Mongoid::Document
  include Mongoid::Timestamps

  field :latitude, type: Float
  field :longitude, type: Float
  field :address_line1, type: String
  field :address_line2, type: String
  field :zipcode, type: String
  field :city, type: String
  field :state, type: String
  field :country, type: String
  embedded_in :addressable, polymorphic: true
end
