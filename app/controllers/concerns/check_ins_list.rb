# frozen_string_literal: true

module CheckInsList
  extend ActiveSupport::Concern
  def get_check_ins(obj)
    if params[:user_id]
      CheckIn.where(user_id: params[:user_id], check_in_datetime: obj.midnight..obj.end_of_day).asc(:check_in_datetime)
    else
      CheckIn.where(user_id: current_user.id, check_in_datetime: obj.midnight..obj.end_of_day).asc(:check_in_datetime)
    end
  end
  def get_check_ins_with_timezone(obj, obj2)
    if params[:user_id]
      CheckIn.where(user_id: params[:user_id], check_in_datetime: obj.midnight - obj2..obj.end_of_day).asc(:check_in_datetime)
    else
      CheckIn.where(user_id: current_user.id, check_in_datetime: obj.midnight - obj2..obj.end_of_day).asc(:check_in_datetime)
    end
  end
end
