# frozen_string_literal: true

Apipie.configure do |config|
  config.app_name                = 'FieldEnable'
  config.app_info                = 'API for Field Enable'
  config.api_base_url            = '/api'
  config.validate                = false
  config.doc_base_url            = '/docs'
  config.default_version         = 'v1'
  config.default_locale          = nil # default is :en introduced in 0.5.2, we are not using locale for docs
  # where is your API defined?
  config.api_controllers_matcher = Rails.root.join('app', 'controllers', 'api', '**', '*.rb')
end
