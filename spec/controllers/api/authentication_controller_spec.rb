# frozen_string_literal: true

require 'spec/spec_helper'

describe API::AuthenticationController do
  let(:user) { create(:user, email: 'user@test.com', password: 'test1234') }
  let(:oauth_application) { create('doorkeeper::Application') }
  let(:token) { Doorkeeper::AccessToken.first }

  describe 'POST :access_token' do
    it 'returns user oauth access token' do
      oauth_application
      user
      post :user_access_token, params: { client_id: oauth_application.uid, client_secret: oauth_application.secret,
                                         username: 'user1@test.com', password: 'test1234' }
      expect(response.status).to eq(200)
      expect(json).to include_json(access_token: token.token,
                                   token_type: 'bearer',
                                   expires_in: token.expires_in,
                                   refresh_token: token.refresh_token,
                                   created_at: token.created_at.to_i,
                                   scopes: token.scopes.to_a)
    end

    context 'when oauth client details are wrong' do
      it 'returns 403' do
        oauth_application
        user
        post :user_access_token, params: { client_id: oauth_application.uid, client_secret: 'incorrect',
                                           username: 'user1@test.com', password: 'test1234' }
        expect(response.status).to eq(403)
      end
    end

    context 'when user credentials are wrong' do
      it 'returns 403' do
        oauth_application
        user
        post :user_access_token, params: { client_id: oauth_application.uid, client_secret: oauth_application.secret,
                                           username: 'user1@test.com', password: 'test123456' }
        expect(response.status).to eq(403)
      end
    end
  end

  describe 'POST :forgot_password' do
    it 'returns 200' do
      user
      post :forgot_password, params: { email: 'user1@test.com' }
      expect(response.status).to eq(200)
    end

    it 'returns 422 when user not found.' do
      post :forgot_password, params: { email: 'user1@test.com' }
      expect(response.status).to eq(422)
    end

    it 'returns 422 when email parameter not provided' do
      post :forgot_password
      expect(response.status).to eq(422)
    end
  end
end
