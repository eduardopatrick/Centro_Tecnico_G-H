Rails.application.routes.draw do

  ActiveAdmin.routes(self)
  resources :posts
  root 'posts#index'
  resources :courses
  get "courses" => "courses#index"

end
