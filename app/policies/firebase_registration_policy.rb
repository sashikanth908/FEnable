# frozen_string_literal: true

class FirebaseRegistrationPolicy < ApplicationPolicy
  def register?
    record.user == user
  end
end
