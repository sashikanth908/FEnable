# frozen_string_literal: true

class TrackPolicy < ApplicationPolicy
  def create?
    user
  end
  alias_method :index?, :create?
end
