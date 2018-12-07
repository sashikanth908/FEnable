# frozen_string_literal: true

class API::V1::TracksController < API::ApplicationController
  include ActionController::Serialization
  include TracksList

  api :GET, '/v1/tracks', 'Get all Tracks'
  description 'Get the all tracks '
  param :user_id, String, desc: 'user_id of the tracks'
  param :date, Date, desc: 'date of tracks to get', required: true
  def index
    authorize Track
    date = Date.parse(params[:date])
    time_zone = params[:time_zone]
    if time_zone.present?
      t = Time.now.in_time_zone(time_zone).to_datetime
      offset = t.offset
      @tracks = get_tracks_with_timezone(date, offset)
    else
      @tracks = get_tracks(date)
    end
    render json: @tracks, status: :ok
  end

  api :POST, '/v1/tracks', 'Create Track'
  description 'Creates a new Track'
  param :data, Array, desc: 'To add  details in array of objects' do
    param :track_id, String, desc: 'track_id', required: true
    param :latitude, Float, desc: 'Latitude', required: true
    param :longitude, Float, desc: 'longitude', required: true
    param :date_time, DateTime, desc: 'date_time of track', required: true
  end
  def create
    data = params[:data]
    @errors = []
    data.each do |user_track|
      track = Track.new
      track.user = current_user
      # TODO: we are assuming date_time as ist_time, need to update asap
      track.track_id = user_track[:track_id]
      track.date_time = ist_time(user_track[:date_time])
      track.latitude = user_track[:latitude]
      track.longitude = user_track[:longitude]
      authorize track
      # @errors << track.errors.full_messages unless track.save
      if track.valid?
        track.save
      else
        logger.error ##########  Track Error ###########
        logger.error track.errors.full_messages
        logger.error ####### Track Object ########
        logger.error track
        logger.error ######### End of Track Error#######
      end
    end
    if @errors.empty?
      render json: { message: 'sucessfully saved' }, status: :ok
    else
      render json: { errors: @errors }, status: :ok
    end
  end
end
