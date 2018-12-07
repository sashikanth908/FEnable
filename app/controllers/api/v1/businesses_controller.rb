# frozen_string_literal: true

class API::V1::BusinessesController < API::ApplicationController
  include ActionController::Serialization
  include API::SupportMethods::PaginationHelpers

  api :GET, '/v1/businesses', 'Get  all Businesses'
  description 'Returns all businesses'
  param :page, String, desc: 'Page number to show'
  param :per_page, String, desc: 'per_page number of businesses to show'
  def index
    authorize Business
    @businesses = Business.where(company_id: current_user.company_id).desc(:created_at)
    render json:  pagination(@businesses),
           serializer: PaginationSerializer,
           status: :ok
  end

  api :GET, '/v1/businesses/:id', 'Get Business'
  description 'Returns the  details of an Business'
  param :id, String, desc: 'Business id', required: true
  def show
    @business = Business.find(params[:id])
    authorize @business
    render json: @business, status: :ok
  end

  api :POST, '/v1/businesses', 'Create business'
  description 'Creates a new Business'
  param :data, Array, desc: 'array of punches' do
    param :name, String, desc: 'Business Name'
    param :business_id, String, desc: 'id of the Business', required: true
    param :longitude, Float, desc: 'longitude', required: true
    param :latitude, Float, desc: 'Latitude', required: true
    param :email, String, desc: 'email of the Business'
    param :username, String, desc: 'name of the user'
    param :nickname, String, desc: 'nickname of the business', required: true
    param :category_id, String, desc: 'id of the category'
    param :phone_number, String, desc: 'phone_number of the Business'
    param :image, File, desc: 'Business Image'
    param :address, Hash, desc: 'Address of the Business' do
      param :latitude, Float, desc: 'latitude of the address'
      param :longitude, Float, desc: 'longitude of the address'
      param :address_line1, String, desc: 'Business located in this address'
      param :address_line2, String, desc: 'Business located near to this address'
      param :zipcode, String, desc: 'Business located with this zipcode'
      param :city, String, desc: 'Business located in this  city'
      param :state, String, desc: 'Business located in this country'
      param :country, String, desc: 'Business located in this country'
    end
  end
  def create
    authorize Business, :create?
    data = params[:data]
    @errors = []
    data.each do |user_business|
      business = Business.where(business_id: user_business[:business_id]).first_or_initialize
      if business
        business.email = user_business[:email]
        business.company = current_user.company
        business.name = user_business[:name]
        business.image = user_business[:image]
        business.username = user_business[:username]
        business.nickname = user_business[:nickname]
        business.business_id = user_business[:business_id] if user_business[:business_id]
        business.category_id = user_business[:category_id]
        business.phone_number = user_business[:phone_number]
        business.latitude = user_business[:latitude] if user_business[:latitude]
        business.longitude = user_business[:longitude] if user_business[:longitude]
        if user_business[:address]
          business.create_address
          business.address.latitude = user_business[:address][:latitude]
          business.address.longitude = user_business[:address][:longitude]
          business.address.address_line1 = user_business[:address][:address_line1]
          business.address.address_line2 = user_business[:address][:address_line2]
          business.address.zipcode = user_business[:address][:zipcode]
          business.address.city = user_business[:address][:city]
          business.address.state = user_business[:address][:state]
          business.address.country = user_business[:address][:country]
        end
        if business.valid?
          business.save
        else
          logger.error ##########  Business Error ###########
          logger.error business.errors.full_messages
          logger.error ####### User Business Object ########
          logger.error user_business
          logger.error ######### End of Business Error#######
        end

        #@errors << business.errors.full_messages unless business.save
      end
    end
    if @errors.empty?
      render json: { message: 'successfully saved' }, status: :ok
    else
      render json: { errors: @errors }, status: :ok
    end
  end
  api :DELETE, '/v1/businesses/:id', 'Delete Business'
  description 'Destroy all details of Business'
  param :id, String, desc: 'Business Id', required: true
  def destroy
    @business = Business.find(params[:id])
    authorize @business
    @business.destroy
    render json: { message: 'Business Destroyed' }, status: :ok
  end

  api :PUT, '/v1/business/:id', ' Update Business'
  description 'Update the specific field Of Business'
  param :id, String, desc: 'Business Id', required: true
  param :name, String, desc: 'Business Name'
  param :image, File, desc: 'Business Image'
  param :email, String, desc: 'email of the Business'
  param :username, String, desc: 'name of the user'
  param :nickname, String, desc: 'nickname of the business', required: true
  param :category_id, String, desc: 'id of the category'
  param :phone_number, String, desc: 'phone_number of the Business'
  param :longitude, Float, desc: 'longitude', required: true
  param :latitude, Float, desc: 'Latitude', required: true
  param :business_id, String, desc: 'id of the Business', required: true
  param :address, Hash, desc: 'Address of the business' do
    param :latitude, Float, desc: 'latitude of the address'
    param :longitude, Float, desc: 'longitude of the address'
    param :address_line1, String, desc: 'business located in this address'
    param :address_line2, String, desc: 'business located near to this address'
    param :zipcode, String, desc: 'business located with this zipcode'
    param :city, String, desc: 'business located in this  city'
    param :state, String, desc: 'business located in this country'
    param :country, String, desc: 'business located in this country'
  end
  def update
    @business = Business.find(params[:id])
    authorize @business
    if @business.update_attributes(business_params)
      render json: @business, status: :ok
    else
      render json: { errors: @business.errors.full_messages }, status: :ok
    end
  end

  private

  def business_params
    params.permit(:name, :business_id, :image, :latitude, :longitude,
                  :email, :phone_number, :username, :category_id, :nickname,
                  address: %i(latitude longitude address_line1 address_line2 zipcode city state country))
  end
end
