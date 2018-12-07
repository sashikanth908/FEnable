# frozen_string_literal: true

module TracksList
  extend ActiveSupport::Concern
  def get_tracks(obj)
    if params[:user_id]
      Track.where(user_id: params[:user_id], date_time: obj.midnight..obj.end_of_day).asc(:date_time)
    else
      Track.where(user_id: current_user.id, date_time: obj.midnight..obj.end_of_day).asc(:date_time)
    end
  end
  def get_tracks_with_timezone(obj, obj2)
    if params[:user_id]
      Track.where(user_id: params[:user_id], date_time: obj.midnight - obj2..obj.end_of_day).asc(:date_time)
    else
      Track.where(user_id: current_user.id, date_time: obj.midnight - obj2..obj.end_of_day).asc(:date_time)
    end
  end
end
