# frozen_string_literal: true

class CompanyPolicy < ApplicationPolicy
  def create?
    user
  end
end
