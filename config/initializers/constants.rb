# frozen_string_literal: true

# define app wide constants here
PHONE_NUMBER_REGEXP = /\A[0-9]{10}\z/
EMAIL_REGEXP = Devise.email_regexp
WEBSITE_REGEX = /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix