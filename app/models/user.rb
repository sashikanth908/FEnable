class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paranoia
  before_validation :update_unique_company_scope

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # TODO: need to enable Registerable in future
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable#, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ''
  field :encrypted_password, type: String, default: ''

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  field :first_name, type: String
  field :last_name, type: String
  field :middle_name, type: String
  field :work_location, type: String
  field :designation, type: String
  mount_uploader :image, ImageUploader
  embeds_one :address, class_name: 'Address', as: :addressable, validate: false
  accepts_nested_attributes_for :address
  field :_roles, type: Hash, default: { user: true }
  field :mobile_number, type: String
  field :active, type: Boolean, default: true
  field :deleted_at, type: Time, default: nil
  field :unique_company_scope, type: String


  index(mobile_number: 1)
  index({ email: 1 }, background: true)
  index({ company_id: 1 }, background: true)


  validates :first_name, presence: true
  validates :mobile_number, presence: true
  validates :mobile_number, uniqueness: { scope: :unique_company_scope },
            format: { with: PHONE_NUMBER_REGEXP,
                      message: I18n.t('validations.phone') }
  validates :email,  uniqueness: { scope: :unique_company_scope }

  scope :active, -> { where(active: true, deleted_at: nil) }

  has_many :mobile_registrations
  has_many :check_ins
  has_many :punches

  def update_unique_company_scope
    self.unique_company_scope = "#{company_id}-#{deleted_at.present? ? deleted_at : 'false'}"
  end


  def full_name
    "#{first_name} #{middle_name} #{last_name}".strip
  end

  def role?(role)
    _roles[role.to_s] || false
  end

  def admin?
    role?(:admin)
  end

  def superadmin?
    role?(:superadmin)
  end

  belongs_to :company
  has_many :check_ins, dependent: :destroy
  has_many :punches, dependent: :destroy
  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time

  def active_for_authentication?
    super
  end

  def self.authenticate(username, password)
    user = User.find_for_authentication(email: username)

    password_valid = user.valid_password?(password) if user
    active = user.active_for_authentication? if password_valid

    # To check user is locked or not. Need to call this whether password is wrong or right
    # Failed count will be increased in this method
    valid = user.valid_for_authentication? { password_valid } if user

    active && valid ? user : nil
  end

  def send_welcome_message
    SmsClient.send_welcome_msg(mobile_number, company.name)
  end
end
