# frozen_string_literal: true

class CheckInPolicy < ApplicationPolicy
  def create?
    user
  end
  alias_method :index?, :create?
  alias_method :revisits?, :create?

  def list?
    user.admin? || user.superadmin?
  end
end
