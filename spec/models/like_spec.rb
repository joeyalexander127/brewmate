require 'rails_helper'

RSpec.describe Like, type: :model do
    it"should validate a user_id" do
      like = Like.create(beer_id: 1)
        expect(like.errors[:user_id]).to_not be_empty
    end
    it"should validate a beer_id" do
      like = Like.create(user_id: 1)
        expect(like.errors[:beer_id]).to_not be_empty
    end
    it"should prevent two likes being created on the same beer for the same user" do
      like = Like.create(user_id: 1, beer_id: 1)
      like2 = Like.create(user_id:1, beer_id: 1)
      expect(like2.errors).to_not be_empty
    end
end
