Rails.application.routes.draw do
  devise_for :users
  resources :beers 
  resources :likes
  resources :users do
    get 'suggested_beers', to: 'beers#suggested_beers'
    get 'charts_data', to: 'beers#charts_data'
  end
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root 'home#index'
  get 'home/index'
end
