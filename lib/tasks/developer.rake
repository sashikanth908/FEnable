# frozen_string_literal: true

namespace :developer do
  desc 'Create company'
  task :company, [:name] => :environment do |t, args|
    company = Company.new(name: args[:name])
    company.save
  end

  desc 'Create company_admin'
  task :company_admin, %i(name email password first_name last_name mobile_number ) => :environment do |t, args|
    company = Company.where(name: args[:name]).first_or_create
    # pass parmas like this rake developer:admin['a@a.com','password', 'password','Chalapathi','raju']
    user = User.new(email: args[:email], password: args[:password], password_confirmation: args[:password],
                    first_name: args[:first_name], last_name: args[:last_name], mobile_number: args[:mobile_number],
                    company: company, _roles: { admin: 'true', user: 'true' })

    user.save
    puts user.errors.inspect
  end
end
