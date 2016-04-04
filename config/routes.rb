Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :authors, only: [:new, :create, :edit, :update]

  namespace :api, defaults: { format: :json } do
    resources :posts, only: [:index]
    # Set up API routes for session
    resource  :session, only: [:show, :create, :destroy]
  end

  get "auth/facebook/callback", to: "omniauth#facebook"
end
