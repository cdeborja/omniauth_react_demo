class AuthorCountry < ActiveRecord::Base
  
  belongs_to :author
  belongs_to :country
  
end