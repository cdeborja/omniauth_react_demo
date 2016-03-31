class AuthorsController < ApplicationController

  def new
    @author = Author.new
  end

  def create
    @author = Author.new(author_params)

    if @author.save
      flash[:success] = "Created account successfuly! Welcome #{@author.name}!"
      redirect_to root_url
    else
      flash.now[:errors] = @author.errors.full_messages
      render :new
    end
  end

  def edit
    @author = Author.find(params[:id])
  end

  def update
    @author = Author.find(params[:id])

    if @author.update(author_params)
      flash[:success] = "Updated successfully"
      redirect_to root_url
    else
      flash.now[:errors] = @author.errors.full_messsages
      render :edit
    end
  end

  private

  def author_params
    params.require(:author).permit(:name, :password) # REMOVED :country_id
  end
end
