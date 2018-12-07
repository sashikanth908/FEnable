# frozen_string_literal: true

class FirebaseService
  URL = 'https://fcm.googleapis.com/fcm/send'
  HEADERS = {
    'Authorization' => "key=#{Rails.application.secrets.firebase_token}",
    'Content-Type' => 'application/json'
  }.freeze

  def self.push_notification(firebase_registration, notification)
    return false if firebase_registration.registration_ids.blank?
    body = {
      registration_ids: firebase_registration.registration_ids,
      content_available: true,
      priority: "high",
      notification: {
        body: notification.message,
        badge: notification.user.unseen_notification_alerts.count
      },
      data: {
        postID: notification.post_id
      }
    }
    response = HTTParty.post(URL, headers: HEADERS, body: body.to_json)
    parse_response(response, firebase_registration)
  end

  def self.alert_push_notification(firebase_registration, alert)
    return false if firebase_registration.registration_ids.blank?
    body = {
      registration_ids: firebase_registration.registration_ids,
      content_available: true,
      priority: "high",
      notification: { body: alert.message },
      data: { alertID: alert.id }
    }
    response = HTTParty.post(URL, headers: HEADERS, body: body.to_json)
    parse_response(response, firebase_registration)
  end

  private_class_method def self.parse_response(response, firebase_registration)
    case response.code
    when 200
      body = response.body || {}
      body = JSON.parse(body) unless body.empty?
      update_ids(body, firebase_registration) if body['results']
      'Success'
    when 400
      'Invalid JSON'
    when 401
      'Invalid Authentication'
    when 503
      'Temporarily Unavailable'
    when 500..599
      'Internal Error'
    end
  end

  private_class_method def self.update_ids(body, firebase_registration)
    updated_ids = Array.new(firebase_registration.registration_ids)
    body['results'].each_with_index do |result, index|
      if result['error'] == 'NotRegistered' || result['error'] == 'InvalidRegistration'
        updated_ids.delete(firebase_registration.registration_ids[index])
      elsif result['registration_id']
        updated_ids.delete(firebase_registration.registration_ids[index])
        updated_ids.push(result['registration_id'])
      end
    end
    firebase_registration.update_attribute('registration_ids', updated_ids)
  end
end
