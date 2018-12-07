# frozen_string_literal: true

class Company
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  after_create :create_default_categories
  after_create :create_default_call_results
  after_create :create_default_check_out_reasons
  field :name, type: String
  field :company_time_in, type: String, default: '9'
  field :company_time_out, type: String, default: '6'
  field :revisit, type: Boolean, default: true
  field :default_category_id, type: String
  field :phone_number, type: String
  embeds_one :address, class_name: 'Address', as: :addressable, validate: false
  accepts_nested_attributes_for :address
  has_many :businesses, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :call_results, dependent: :destroy
  has_many :check_out_reasons, dependent: :destroy
  has_many :late_time_out_reasons, dependent: :destroy
  has_many :users, dependent: :destroy

  private

  def create_default_categories
    %w(Doctor Chemist Distributor Camps Wholesaler Transit Reminders Meetings Others).each do |name|
      categories.create(name: name)
    end
  end

  def create_default_call_results
    ['Sample Submitted', 'Personal Order Booking', 'Payment collected', 'Detailing on the Product',
     'Not available', 'Follow Up', 'No order recd', 'Other'].each do |name|
      call_results.create(name: name)
    end
  end

  def create_default_check_out_reasons
    ['Forgot to checkout', 'Device shutdown due to battery drain',
     'Device got hanged and not responding'].each do |name|
      check_out_reasons.create(name: name)
    end
  end
end
