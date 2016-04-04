class OmniauthController < ApplicationController

  def facebook
    # find a user who matches auth hash
    author = Author.find_or_create_by_auth_hash(auth_hash)
    log_in!(author)
    redirect_to root_url + "#/posts"
  end

  private
  def auth_hash
    request.env['omniauth.auth']
  end

end
