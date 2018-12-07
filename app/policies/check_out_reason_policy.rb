# frozen_string_literal: true

class CheckOutReasonPolicy < ApplicationPolicy
  def index?
    user
  end
end