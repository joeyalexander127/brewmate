class Like < ApplicationRecord
    belongs_to :beer
    belongs_to :user
    validates :user_id, :beer_id, presence:true
    validates :beer_id, uniqueness: {scope: :user_id}
end
