class PostsController < ApplicationController
  before_action :ensure_logged_in
  # #======= JSON post =========
  # "post" {
  #   "title": "something"
  #   },
  #   "body": "else"
  #   }
  # }

  def index
    #instance method of the PostsController class.
    @posts = Post.includes(:author).order(updated_at: :desc)
    @post = Post.new
    # render({json: posts})
    # render json: posts2 #=> error, cannot render twice for single response.

    # looks for a view called index in the posts folder
    render :index
    # ^^ we don't need to explicitly render index...rails figures it out
    # because we're in the index action
  end

  def create
    # post = Post.new(
    #   title: params[:title],
    #   body: params[:body]
    # )
    # post_params = params.require(:post).permit(:title, :body, :author_id)
    @post = current_user.posts.new(post_params)
    if @post.save
      # render json: post
      redirect_to posts_url
    else
      # render json: post.errors.full_messages, status: :unprocessable_entity
      @posts = Post.includes(:author).order(updated_at: :desc)
      flash[:errors] = @post.errors.full_messages
      render :index
    end
  end

  def show
    @post = Post.find(params[:id])
    # render json: post
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :author_id)
  end

end
