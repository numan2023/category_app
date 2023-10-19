Rails.application.routes.draw do
  root 'categories#new'
  resources :categories, only:[:new]
end
