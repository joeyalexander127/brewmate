class Beer < ApplicationRecord
    has_many :likes
    belongs_to :user
    validates :beer_name, :brewery_name, :style, :abv, :ibu, :image, presence: true
    validates :beer_name, uniqueness: { scope: :brewery_name}
end
