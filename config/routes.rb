Rails.application.routes.draw do
  # get("/posts", {to: "posts#index"})

  # get "/posts", to: "posts#index"
  # post "/posts", to: "posts#create"
  # get "/posts/:id", to: "posts#show", as: :post

  # When someone navigates to '/posts',
  # create an instance of the PostsController and call the #index method.

  resources(:posts, {only: [:index, :show, :create]})
  resources :posts, only: [:index, :show, :create]
  resources :authors, only: [:create, :new]
  resource :session, only: [:new, :create, :destroy]
  # resources :authors do
  #   resources :posts
  # end

  get 'get_cookie', to: 'cookies#get'
  # look for get action in CookiesController
    # in file named cookies_controller.rb
  get 'set_cookie', to: 'cookies#set'
  get 'set_flash', to: 'cookies#set_flash'


  root to: "static_pages#root"
  # EVERYTHING WILL BE UNDER API NAMESPACE!!! MWAHAHA!!! (except for that root thing)
  namespace :api, defaults: {format: :json} do
    resources :posts, only: [:index]
  end
end
