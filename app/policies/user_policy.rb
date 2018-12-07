# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def index?
    admin_or_superadmin?
  end

  def create?
    same_company? && admin_or_superadmin?
  end

  def update?
    me? || create?
  end

  alias_method :show?, :create?
  alias_method :destroy?, :create?

  def me?
    user.id == record.id
  end

  def history?
    user
  end

  def get_dashboard_count?
    user.admin? || user.superadmin?
  end

  class Scope < Scope
    def resolve
      scope.where(company_id: user.company_id)
    end
  end
end
