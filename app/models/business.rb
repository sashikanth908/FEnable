# frozen_string_literal: true

class Business
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  field :name, type: String
  field :latitude, type: Float
  field :longitude, type: Float
  field :email, type: String
  field :phone_number, type: String
  field :business_id, type: String
  field :username, type: String
  field :nickname, type: String
  field :category_id, type: String

  mount_uploader :image, ImageUploader
  embeds_one :address, class_name: 'Address', as: :addressable, validate: false
  accepts_nested_attributes_for :address

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :business_id, presence: true
  validates_presence_of :nickname, message: '^Please enter either nickname or name for the business',  if: :name?

  def name?
    self.name.nil? && self.nickname.nil?
  end

  has_many :check_ins
  belongs_to :company
end
