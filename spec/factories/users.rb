FactoryBot.define do

  factory 'doorkeeper::Application' do
    name 'testing'
    uid 'uniqueid'
    secret 'dont-tell-anyone'
    redirect_uri 'https://testhost'
  end

  factory 'doorkeeper::AccessToken' do
    resource_owner_id '1'
    application_id '1'
  end

  factory :user do
    
  end
end
