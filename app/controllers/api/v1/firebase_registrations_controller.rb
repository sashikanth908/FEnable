# frozen_string_literal: true
class API::V1::FirebaseRegistrationsController < API::ApplicationController
  include AbstractController::Translation

  skip_after_action :verify_authorized, only: :index
  api :GET, '/v1/firebase_registrations', 'Lists firebase notification registration data of current user'
  description "Lists data associated with the current user's mobile devices that can receive push notifications"

  def index
    render json: policy_scope(FirebaseRegistration.where(user_id: current_user.id)),
           each_serializer: FirebaseRegistrationSerializer
  end

  api :POST, '/v1/firebase_registrations/register', 'Register/updates the firebase registration'
  description "creates/updates a given mobile registration's data with passed params"
  param :firebase_notification_id, String,
        desc: 'Firebase Notification id specific for mobile device that want push notifications',
        required: true

  def register
    firebase_registration = FirebaseRegistration.where(user: current_user).first_or_create
    authorize firebase_registration

    if params[:firebase_notification_id].blank?
      render json: { message: t('errors.field_required', field: 'firebase_registration_id') },
             status: :unprocessable_entity and return
    end
    if firebase_registration.registration_ids.include?(params[:firebase_notification_id])
      render json: { message: 'Firebase Notification Id has been already added' }, status: :ok
    else
      firebase_registration.registration_ids= [params[:firebase_notification_id]]
      firebase_registration.save
      render json: firebase_registration, serializer: FirebaseRegistrationSerializer
    end
  end
end
