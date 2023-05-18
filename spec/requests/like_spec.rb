require 'rails_helper'

RSpec.describe "Likes", type: :request do
  let (:user) {User.create email: 'brewmate@testing.com', password: 'brewmate123'}
  let (:beer) {user.beers.create beer_name: "Backyard Buds", brewery_name: "Hoppy Hour", style: "blonde", abv: 5, ibu: 2, image:"https//:www.random.com"}
  let (:like) {Like.create user_id: user.id, beer_id: beer.id}
  describe "GET /index" do
      it "gets a list of likes" do 
        Like.create(user_id: user.id, beer_id: beer.id)

          get '/likes'
          like = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(like.length).to eq 1
      end
  end


  describe "POST /create" do
    it "creates a like" do
      strong_params= {
        like: {
          beer_id: beer.id,
          user_id: user.id
      }
        }

      post "/likes", params: strong_params

      expect(response).to have_http_status(200)
      like = Like.last
      expect(like.beer_id).to eq beer.id
      expect(beer.user_id).to eq user.id
      end

      it "does not create a like without a user id" do
        strong_params= {
        like: {
          beer_id: 1,
          user_id: ""
      }
        }
        post "/likes", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['user_id']).to include "can't be blank"
      end

      it "does not create a beer with out a beer_id" do
        strong_params= {
        like: {
          beer_id: "",
          user_id: 1
      }
        }
        post "/likes", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['beer_id']).to include "can't be blank"
      end

      
  end

  describe "DELETE /destroy" do
    it "deletes a like" do
      strong_params= {
        like: {
          user_id: user.id,
          beer_id: beer.id
        }
      }
      post "/likes", params: strong_params
      like = Like.last
      likes = Like.all

      delete "/likes/#{like.id}"
      expect(response).to have_http_status(200)
      expect(likes).to be_empty
    end

  end
  
end
