# frozen_string_literal: true

class API::V1::DashboardsController < API::ApplicationController
  # skip_before_action :doorkeeper_authorize, only: [:index]
  # skip_after_action :verify_authorized, only: [:index]


  api :GET, '/v1/dashboards', 'Get all the reports of the company'
  description 'Get all the reports'
  def get_dashboard_count
    authorize User, :get_dashboard_count?
    user = current_user
    if user.admin?
      users = User.where(company_id: user.company_id)
      users_count = users.count
      visits = CheckIn.where(user_id: users.map(&:id))
      visits_count = visits.count
      revisits_count = visits.where(revisit: 'true').count
    end
    render json: { users_count: users_count,
                   visits_count: visits_count,
                   revisits_count: revisits_count
    }, status: :ok

  end
end
