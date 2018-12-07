Rails.application.routes.draw do
  use_doorkeeper
  apipie
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'react#index'

  namespace :api do
    resources :authentication, only: %i(), defaults: { format: :json } do
      collection do
        post :user_access_token
        post :forgot_password
        post :send_verification_code
        post :verify_otp
      end
    end
    namespace :v1 do
      resources :dashboards do
        collection do
          get :get_dashboard_count
        end
      end
      resources :businesses
      resources :companies
      resources :categories
      resources :call_results
      resources :check_out_reasons
      resources :late_time_out_reasons
      resources :master_minds, only: %i(index)
      resources :users do
        collection do
          get :history
          get :me
          get :users_latest_tracks
          get :download
        end
      end
      resources :punches do
        collection do
          get :list
        end
      end
      resources :check_ins do
        collection do
          get :list
          get :revisits
        end
      end
      resources :tracks
      resources :firebase_registrations, only: %i(index) do
        collection do
          post :register
        end
      end
    end
  end

  #Web routes
  get '/terms', controller: :home, action: :terms
  get '/privacy', controller: :home, action: :privacy
  get '/app_redirection', controller: :home, action: :app_redirection
  resources :users, controller: :react, only: %i(index show)
  resources :usersFullList, controller: :react, only: %i(index show)
  resources :check_ins, controller: :react, only: %i(index)
  resources :punches, controller: :react, only: %i(index)
  resources :user_tracks, controller: :react, only: %i(index)
  resources :map, controller: :react, only: %i(index)
  resources :fieldVisitsList, controller: :react, only: %i(index)
  resources :users, controller: :react, only: %i(index show) do
    get '/download', to: 'react#index'
    end


end
