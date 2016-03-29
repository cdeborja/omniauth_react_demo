class SessionsController < ApplicationController
  before_action :ensure_logged_out, only: [:new, :create]

  def new
    @author = Author.new
  end

  def create
    @author = Author.find_by_credentials(
      params[:author][:name],
      params[:author][:password]
    )
    if @author
      log_in!(@author)
      redirect_to posts_url
    else
      flash[:errors] = ["Invalid name/password combination"]
      @author = Author.new(name: params[:author][:name])
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end

end
