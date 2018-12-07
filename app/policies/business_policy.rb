# frozen_string_literal: true

class BusinessPolicy < ApplicationPolicy
  def index?
    user
  end
  alias_method :show?, :index?
  alias_method :create?, :index?
  alias_method :update?, :index?
  alias_method :destroy?, :index?
end
