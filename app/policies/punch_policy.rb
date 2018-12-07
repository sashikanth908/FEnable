# frozen_string_literal: true

class PunchPolicy < ApplicationPolicy
  def create?
    user
  end
  
  alias_method :index?, :create?

  def list?
    user.admin? || user.superadmin?
  end
end
