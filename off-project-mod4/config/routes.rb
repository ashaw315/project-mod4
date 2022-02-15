Rails.application.routes.draw do
  
  resources :reviews
  # resources :users
  resources :topics, only: [:index, :show, :create]
  resources :users, only: [:index, :show]

 post "/signup", to: "users#create"
 get "/me", to: "users#me"
 get "/your_every", to: "users#your_every"

 post "/login", to: "sessions#create"
 delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
