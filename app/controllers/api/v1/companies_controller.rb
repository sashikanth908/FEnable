# frozen_string_literal: true

class API::V1::CompaniesController < API::ApplicationController
  include ActionController::Serialization

  api :POST, '/v1/companies', 'Create Company'
  description 'Creates a new Company'
  param :name, String, desc: 'Company Name', required: true
  param :phone_number, String, desc: 'Phone number of the company'
  param :company_time_in, Time, desc: 'Company start time'
  param :company_time_out, Time, desc: 'Company end time'
  param :revisit, Boolean, desc: 'company revisit status'
  param :address, Hash, desc: 'Address of the company' do
    param :latitude, Float, desc: 'latitude of the address'
    param :longitude, Float, desc: 'longitude of the address'
    param :address_line1, String, desc: 'company located in this address'
    param :address_line2, String, desc: 'company located near to this address'
    param :zipcode, String, desc: 'company located with this zipcode'
    param :city, String, desc: 'company located in this  city'
    param :state, String, desc: 'company located in this country'
    param :country, String, desc: 'company located in this country'
  end
  def create
    @company = Company.new(companies_params)
    authorize @company
    if @company.save!
      render json: @company, status: :ok
    else
      render json: { errors: @company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def companies_params
    params.permit(:name, :company_time_in, :company_time_out, :revisit, :phone_number,
                  address: %i(latitude longitude address_line1 address_line2 zipcode city state country))
  end
end
