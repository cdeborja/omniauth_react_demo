class Api::PostsController < ApplicationController

  def index
    @posts = Post.includes(:author).order(updated_at: :desc)
    # will find view in views/api/posts
    # Looking for index.json because default format is json
    render :index
  end

end
