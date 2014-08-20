class Resource < ActiveRecord::Base
  # Remember to create a migration!
  validates :img_url , uniqueness: true
end
