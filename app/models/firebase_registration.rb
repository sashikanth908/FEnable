# frozen_string_literal: true
class FirebaseRegistration
  include Mongoid::Document
  include Mongoid::Timestamps

  field :registration_ids, type: Array, default: []

  belongs_to :user

  def push_notification(notification)
    FirebaseService.push_notification(self, notification)
  end

  def alert_push_notification(alert)
    FirebaseService.alert_push_notification(self, alert)
  end
end
