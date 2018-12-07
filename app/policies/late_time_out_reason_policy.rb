# frozen_string_literal: true

class LateTimeOutReasonPolicy < ApplicationPolicy
  def index?
    user
  end
end
