class CookiesController < ApplicationController

  def get
    # if you signed a cookie, retrieve a cookie with cookies.signed
    # secret = cookies.signed[:secret]

    # replace cookie.signed with session
    secret = session[:secret]
    message = flash[:message]

    render text: "I found a secret: #{secret} and the flash: #{message}"


  end

  def set_flash
    message = params[:flash]
    flash[:message] = message
    # flash values will only last through one request
      # use if you want cookie info after a redirect
    # redirect_to get_cookie_url

    # flash.now[:message] = message
    # flash.now values will be available in the current request
      # use if you want cookie info in a render

    render text: "Alert: Flash now!: #{flash[:message]}"
  end

  def set
    # cookies is a rails method
    # low-level way of accessing cookies

    secret = params[:sent_secret]

    # cookies.signed[:secret] = secret
    session[:secret] = secret



    render text: "I set a secret: #{secret}"
  end
end
