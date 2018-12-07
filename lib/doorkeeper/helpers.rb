# frozen_string_literal: true

module Doorkeeper
  module Rails
    module Helpers
      def doorkeeper_authorize(*scopes)
        return true if current_user.present?

        return doorkeeper_render_error unless valid_token(scopes)

        user = User.where(id: doorkeeper_token.resource_owner_id).first
        return render json: { status: :unauthorized }, status: :unauthorized unless user.active_for_authentication?

        sign_in user
        @current_user = warden.user
      end

      def sign_out_token_user
        return unless bearer_in_header && current_user
        reset_session
        sign_out current_user
      end

      def bearer_in_header
        return false if request.env['HTTP_AUTHORIZATION'].nil?
        token = request.env['HTTP_AUTHORIZATION'].downcase
        token.include?('bearer')
      end

      private

      def valid_token(scopes)
        @_doorkeeper_scopes = scopes.presence || Doorkeeper.configuration.default_scopes
        valid_doorkeeper_token? && doorkeeper_token.resource_owner_id
      end
    end
  end
end
