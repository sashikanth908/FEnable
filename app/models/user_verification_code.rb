require 'sms_client'
class UserVerificationCode
  include Mongoid::Document
  include Mongoid::Timestamps

  scope :active, -> { where(verified_at: nil) }

  # belongs_to :user

  field :mobile_number, type: String
  field :code, type: String
  field :sent_at, type: DateTime
  field :verified_at, type: DateTime
  field :user_ids, type: Array

  index(mobile_number: 1)
  index(code: 1)

  def self.verification_code(mobile_number, user_ids)
    code = UserVerificationCode.active.where(mobile_number: mobile_number).desc(:created_at).first

    if code.blank? || code.created_at < DateTime.now - AppConfig.sms_code_regenerate_interval
      return self.generate_code(mobile_number, user_ids)
    end

    code
  end

  def self.verify_otp(mobile_number, otp)
    code = UserVerificationCode.active.where(mobile_number: mobile_number, code: otp).desc(:created_at).first
    # TODO: Date operation. convert both to UTC before condition verification
    return nil if code.blank? || code.created_at < DateTime.now.utc - AppConfig.sms_code_valid_time_interval
    code.update_attributes(verified_at: DateTime.now.utc)
    code
  end

  def send_sms(company)
    return unless AppConfig.send_sms_verification_code
    return if sent_at && sent_at > DateTime.now - AppConfig.sms_resend_time_interval
    SmsClient.send_sms(mobile_number, code, company)
  end

  private

  def self.generate_code(mobile_number, user_ids)
    UserVerificationCode.create!(mobile_number: mobile_number, code: self.generate_random_code(mobile_number), user_ids: user_ids)
  end

  def self.generate_random_code(mobile_number)
    return 654_321 if %w(9999999999 9727932996).include? mobile_number
    return 123_456 unless AppConfig.send_sms_verification_code
    rand(900_000) + 100_000
  end
end
