# frozen_string_literal: true

module API::Concerns::User
  extend ActiveSupport::Concern

  included do
    attributes :id, :full_name, :mobile_number, :email, :company_id, :image, :work_location, :designation
  end
end
