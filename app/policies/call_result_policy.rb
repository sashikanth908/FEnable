# frozen_string_literal: true

class CallResultPolicy < ApplicationPolicy
  def index?
    user
  end
end