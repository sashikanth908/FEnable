# frozen_string_literal: true

class CheckIn
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  include Mongoid::Search

  field :check_in_datetime, type: DateTime
  field :check_in_latitude, type: Float
  field :check_in_longitude, type: Float
  field :check_in_timezone, type: String
  field :check_out_datetime, type: DateTime
  field :check_out_latitude, type: Float
  field :check_out_longitude, type: Float
  field :check_out_timezone, type: String
  field :check_in_id, type: String
  field :check_in, type: Boolean
  field :comments, type: String
  field :business_id, type: String
  field :check_in_business_id, type: String
  field :revisit, type: Boolean
  field :revisit_date, type: Date
  field :call_result_id, type: String
  field :check_out_reason_id, type: String

  index({ check_in_id: 1 }, unique: true)
  index({ check_in_datetime: 1, check_out_datetime: 1 }, background: true)

  validates :check_in_datetime, presence: true
  validates :check_in_latitude, presence: true
  validates :check_in_longitude, presence: true
  validates :check_in, presence: true
  validates :business_id, presence: true
  validates :check_in_business_id, presence: true
  validates :check_in_id, presence: true, uniqueness: true
  validates :call_result_id, presence: true, if: :check_out?
  validates :revisit_date, presence: true, if: :revisit_true?

  belongs_to :user
  belongs_to :business

  def revisit_true?
    self.revisit == 1
  end

  def check_out?
    self.check_in == 0
  end
  search_in :user_id, user: %i(first_name last_name email)
  index({ check_in_id: 1 }, unique: true)
  index({ user: 1 })
  index({ check_in_datetime: 1, check_out_datetime: 1 }, background: true)
  index({ created_at: -1 }, background: true)

end
