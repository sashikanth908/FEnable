# frozen_string_literal: true

class BusinessSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :nickname, :business_id, :image, :email, :phone_number,
             :latitude, :longitude, :category_id
  has_one :address, serializer: AddressSerializer

end
