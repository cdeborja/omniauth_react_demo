class AuthorsController < ApplicationController

  def new
    @author = Author.new
  end

  def create
    @author = Author.new(author_params)
    # @author. is an Author object, valid or not.
    # @author.save returns false if author is invalid
    if @author.save
      flash[:success] = "Created account successfuly! Welcome #{@author.name}!"
      redirect_to posts_url
      # sends instruction to browser:
      # 'make a get request to the posts url!'
    else
      flash.now[:errors] = @author.errors.full_messages
      render :new
      # goes to views/authors/new
    end
  end
  
  def edit
    @author = Author.find(params[:id])
  end
  
  def update
    @author = Author.find(params[:id])
    
    if @author.update(author_params)
      flash[:success] = "Updated successfully"
      redirect_to posts_url
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
