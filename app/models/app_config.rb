class AppConfig

  def self.send_sms_verification_code
    ENV['SEND_SMS_VERIFICATION_CODE'] == 'true'
  end

  def self.sms_code_regenerate_interval
    (ENV['SMS_CODE_REGENERATE_TIME_IN_MIN'].to_i || 5).minutes
  end

  def self.sms_resend_time_interval
    (ENV['SMS_SEND_TIME_INTERVAL_IN_MIN'].to_i || 1).minutes
  end

  def self.sms_code_valid_time_interval
    (ENV['SMS_CODE_VALID_TIME_IN_MIN'].to_i || 60).minutes
  end
end
