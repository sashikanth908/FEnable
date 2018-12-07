# frozen_string_literal: true

module PunchesList
  extend ActiveSupport::Concern
  def get_punches(obj)
    if params[:user_id]
      Punch.where(user_id: params[:user_id], punch_in_datetime: obj.midnight..obj.end_of_day).asc(:punch_in_datetime)
    else
      Punch.where(user_id: current_user.id, punch_in_datetime: obj.midnight..obj.end_of_day).asc(:punch_in_datetime)
    end
  end
  def get_punches_with_timezone(obj, obj2)
    if params[:user_id]
      Punch.where(user_id: params[:user_id], punch_in_datetime: obj.midnight- obj2..obj.end_of_day).asc(:punch_in_datetime)
    else
      Punch.where(user_id: current_user.id, punch_in_datetime: obj.midnight - obj2..obj.end_of_day).asc(:punch_in_datetime)
    end
  end
end
