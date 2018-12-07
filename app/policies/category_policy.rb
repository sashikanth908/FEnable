# frozen_string_literal: true

class CategoryPolicy < ApplicationPolicy
  def index?
    user
  end
end
