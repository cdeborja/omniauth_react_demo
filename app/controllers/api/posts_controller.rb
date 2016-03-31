class Api::PostsController < ApplicationController
  before_action :ensure_logged_in, only: :index
  def index
    @posts = Post.includes(:author).order(updated_at: :desc)
  end
end
