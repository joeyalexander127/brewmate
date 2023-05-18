require 'rails_helper'

RSpec.describe Beer, type: :model do
  let (:user) {User.create email: 'brewmate@testing.com', password: 'brewmate123'}
    it"should validate a beer name" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2, image:"https//:www.random.com")
        expect(beer.errors[:beer_name]).to_not be_empty
    end
    it"should validate a brewery name" do
      beer= user.beers.create(
        beer_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2, image:"https//:www.random.com")
        expect(beer.errors[:brewery_name]).to_not be_empty
    end
    it"should validate a beer style" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", abv: 5, ibu: 2, image:"https//:www.random.com")
        expect(beer.errors[:style]).to_not be_empty
    end
    it"should validate a abv" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", style: "blonde",  ibu: 2, image:"https//:www.random.com")
        expect(beer.errors[:abv]).to_not be_empty
    end
    it"should validate a ibu" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", style: "blonde", abv: 5,  image:"https//:www.random.com")
        expect(beer.errors[:ibu]).to_not be_empty
    end
    it"should validate a image" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2)
        expect(beer.errors[:image]).to_not be_empty
    end
    it"beer name must be unique within brewery" do
      beer= user.beers.create(
        brewery_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2)
        beer2= user.beers.create(
          brewery_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2)
        expect(beer2.errors[:beer_name]).to_not be_empty
    end
end
