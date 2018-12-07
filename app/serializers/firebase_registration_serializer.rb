# frozen_string_literal: true

class FirebaseRegistrationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :registration_ids

end