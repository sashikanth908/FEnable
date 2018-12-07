# frozen_string_literal: true

require 'httparty'

class SmsClient

  API_KEY = Rails.application.secrets.sms_client_api_key
  SENDER = "FLDNBL"



  def self.send_sms(mobile_number, otp, company)
    message = I18n.t('sms.otp_message', otp: otp, company: company.name,
                                        validity: AppConfig.sms_code_valid_time_interval / 60)

    requested_url = 'https://api.textlocal.in/send/?' + "api_key=" + API_KEY + "&numbers=" + mobile_number + "&message=" + URI.escape(message) + "&sender=" + SENDER

    # TODO parse the response and update sent at time stamp
    JSON.parse(HTTParty.get(requested_url).body)
  end

  def self.send_welcome_msg(mobile_number, company_name)
    message = I18n.t('sms.welcome_msg', company_name: company_name, url: ENV['APP_REDIRECTION_SHORT_URL'])
    requested_url = 'https://api.textlocal.in/send/?' + "api_key=" + API_KEY + "&numbers=" + mobile_number + "&message=" + URI.escape(message) + "&sender=" + SENDER

    # TODO parse the response and update sent at time stamp
    JSON.parse(HTTParty.get(requested_url).body)
  end
end
