# frozen_string_literal: true

class AddressSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :address_line1, :address_line2, :zipcode, :city, :state, :country
end