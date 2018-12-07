# frozen_string_literal: true

class MobileRegistration
  include Mongoid::Document
  include Mongoid::Timestamps
  field :os_version, type: String
  field :os_type, type: String
  field :device_name, type: String
  field :device_token, type: String

  validates_presence_of :device_token

  belongs_to :user, index: true
end
