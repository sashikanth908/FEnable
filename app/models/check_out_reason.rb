# frozen_string_literal: true

class CheckOutReason
  include Mongoid::Document
  include Mongoid::Timestamps
  # include Mongoid::Paranoia
  field :name, type: String
  belongs_to :company
end
