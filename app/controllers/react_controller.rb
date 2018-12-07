# frozen_string_literal: true

class ReactController < ApplicationController
  before_action :authenticate_user!

  def index
    render html: '', layout: 'react'
  end

  def show
    render html: '', layout: 'react'
  end
end
