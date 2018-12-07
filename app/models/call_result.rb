# frozen_string_literal: true

class CallResult
  include Mongoid::Document
  include Mongoid::Timestamps
  # include Mongoid::Paranoia
  field :name, type: String
  belongs_to :company
end
