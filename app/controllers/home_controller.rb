# frozen_string_literal: true

class HomeController < ApplicationController
  # TODO: need a proper method name here
  def app_redirection
    browser = Browser.new(request.user_agent)
    if browser.platform.android?
      redirect_to 'https://play.google.com/store/apps/details?id=com.fieldenable.app.fieldenable'
    elsif browser.platform.ios?
      redirect_to 'https://apple.co/2HJaDRM'
    else
      # TODO: need to update this in future
      redirect_to root_path
    end
  end

  def terms
    # TODO: need to update if we have any dynamic content based on company
  end

  def privacy
    # TODO: need to update if we have any dynamic content based on company
  end
end
