source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers', '0.9.3' # use for access activemodel serializer
gem 'apipie-rails' # API documentation
gem 'browser'
gem 'carrierwave-mongoid', require: 'carrierwave/mongoid' # File upload
gem 'custom_error_message', '~> 1.1', '>= 1.1.1'
gem 'devise' # Warden based authentication
gem 'doorkeeper-mongodb' # oauth library
gem 'dotenv-rails' # To load environment variables from .env files
gem 'haml-rails' # haml preprocessor
gem 'httparty', '~> 0.11.0'
gem "i18n-js", '~> 3.0.5'# translations for java script
gem 'kaminari-mongoid' #  Use for Pagination
gem 'mongoid', '~> 6.1.0' # ORM for mongodb
gem 'mongoid-enum', git: 'https://github.com/boie0025/mongoid-enum.git', branch: 'nb/mongoid-6' # enum for mongoid
gem 'mongoid_paranoia', '~> 0.3.0' # Use for soft deletion of a document
gem 'mongoid_search'
gem 'puma', '~> 3.7' # Use Puma as the app server
gem 'pundit' # authorization for ruby classes
gem 'rails', '~> 5.1.4' # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'sass-rails', '~> 5.0' # Use SCSS for stylesheets
gem 'turbolinks', '~> 5' # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'uglifier', '>= 1.3.0' # Use Uglifier as compressor for JavaScript assets
gem 'webpacker' # Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker

group :development, :test do
  gem 'byebug', platforms: %i(mri mingw x64_mingw) # Call 'byebug' anywhere in the code to stop execution and get
  # a debugger console
  gem 'factory_bot_rails' # test object creation
  gem 'rspec-rails', '~> 3.5.0' # testing framework
  gem 'rubocop', '~> 0.51', require: false # ruby style checker
end

group :test do
  gem 'capybara' # acceptance test syntactic sugar, used in spec/features
  gem 'database_cleaner' # set of strategies for cleaning your database before starting spec
  gem 'rspec-json_expectations' # provides include_json matcher
  gem 'simplecov', '~> 0.7.1', require: false # code coverage stats
end

group :stage do
  gem "letter_opener"
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
#gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]










