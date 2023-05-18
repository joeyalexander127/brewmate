require 'rails_helper'

RSpec.describe "Beers", type: :request do
  let (:user) {User.create email: 'brewmate@testing.com', password: 'brewmate123'}

  describe "GET /index" do
      it "gets a list of beers" do 
        user.beers.create(
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image:"https//:www.random.com"
          )
        
          get '/beers'
          beer = JSON.parse(response.body)
          expect(response).to have_http_status(200)
          expect(beer.length).to eq 1
      end
  end


  describe "POST /create" do
    it "creates a beer" do
      strong_params= {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }

      post "/beers", params: strong_params

      expect(response).to have_http_status(200)
      beer = Beer.last
      expect(beer.beer_name).to eq "Backyard Buds"
      expect(beer.brewery_name).to eq "Hoppy Hour"
      expect(beer.style).to eq "blonde"
      expect(beer.abv).to eq 5
      expect(beer.ibu).to eq 2
      expect(beer.image).to eq "https//:www.random.com"
      expect(beer.user_id).to eq user.id
      end

      it "does not create a beer with out a beer name" do
        strong_params= {
        beer: {
          brewery_name: "Hoppy Hour",
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['beer_name']).to include "can't be blank"
      end

      it "does not create a beer with out a brewery name" do
        strong_params= {
        beer: {
          beer_name: "Backyard BUDS",
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['brewery_name']).to include "can't be blank"
      end

      it "does not create a beer with out a style" do
        strong_params= {
        beer: {
          beer_name: "Backyard BUDS",
          brewery_name: "Hoppy hour",
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['style']).to include "can't be blank"
      end

      it "does not create a beer with out a abv" do
        strong_params= {
        beer: {
          beer_name: "Backyard BUDS",
          brewery_name: "Hoppy hour",
          style: "blonde",
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['abv']).to include "can't be blank"
      end

      it "does not create a beer with out a ibu" do
        strong_params= {
        beer: {
          beer_name: "Backyard BUDS",
          brewery_name: "Hoppy hour",
          style: "blonde",
          abv: 2,
          image: "https//:www.random.com",
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['ibu']).to include "can't be blank"
      end

      it "does not create a beer with out a ibu" do
        strong_params= {
        beer: {
          beer_name: "Backyard BUDS",
          brewery_name: "Hoppy hour",
          style: "blonde",
          abv: 2,
          ibu: 30,
          user_id: user.id
      }
        }
        post "/beers", params: strong_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['image']).to include "can't be blank"
      end
  end



  describe "PATCH /update" do
    
    it "updates a beer" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      }
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com"
        }
      }

      patch "/beers/#{beer.id}", params: updated_params

      updated_beer = Beer.find(beer.id)
      expect(response).to have_http_status(200)
      expect(updated_beer.beer_name).to eq "Backyard Buds"
      expect(updated_beer.brewery_name).to eq "Hoppy Hour"
      expect(updated_beer.style).to eq "blonde"
      expect(updated_beer.abv).to eq 5
      expect(updated_beer.ibu).to eq 2
      expect(updated_beer.image).to eq "https//:www.random.com"
      expect(updated_beer.user_id).to eq user.id
    end



    it "does not update a beer with out a beer name" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      }
      
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "",
          brewery_name: "Hoppy Hour", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com"
        }
      }

      patch "/beers/#{beer.id}", params: updated_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['beer_name']).to include "can't be blank"
    end


    it "does not update a beer with out a brewery name" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      }
      
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com"
        }
      }

      patch "/beers/#{beer.id}", params: updated_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['brewery_name']).to include "can't be blank"
    end


    it "does not update a beer with out a style" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      }
        
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com"
        }
      }
  
      patch "/beers/#{beer.id}", params: updated_params
      expect(response).to have_http_status(422)
      json = JSON.parse(response.body)
      expect(json['style']).to include "can't be blank"
    end


    it "does not update a beer with out a abv" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      } 
  
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "", 
          abv: "", 
          ibu: 2,
          image: "https//:www.random.com"
        }
      }

      patch "/beers/#{beer.id}", params: updated_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['abv']).to include "can't be blank"
    end



    it "does not update a beer with out a ibu" do
      strong_params = {
        beer: {
          beer_name: "Test",
          brewery_name: "Test",
          style: "Blonde",
          abv: 1,
          ibu: 1,
          image: "https://www.random.com",
          user_id: user.id
        }
      }
      
      post "/beers", params: strong_params
      beer = Beer.last

      updated_params = {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "", 
          abv: 5, 
          ibu: "",
          image: "https//:www.random.com"
        }
      }
  
        patch "/beers/#{beer.id}", params: updated_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['ibu']).to include "can't be blank"
    end


      it "does not create a beer with out an image" do
        strong_params = {
          beer: {
            beer_name: "Test",
            brewery_name: "Test",
            style: "Blonde",
            abv: 1,
            ibu: 1,
            image: "https://www.random.com",
            user_id: user.id
          }
        }
        
        post "/beers", params: strong_params
        beer = Beer.last
  
        updated_params = {
          beer: {
            beer_name: "Backyard Buds",
            brewery_name: "Hoppy Hour", 
            style: "", 
            abv: 5, 
            ibu: 2,
            image: ""
          }
        }
  
        patch "/beers/#{beer.id}", params: updated_params
        expect(response).to have_http_status(422)
        json = JSON.parse(response.body)
        expect(json['image']).to include "can't be blank"
      end
    end

  describe "DELETE /destroy" do
    it "deletes a beer" do
      strong_params= {
        beer: {
          beer_name: "Backyard Buds",
          brewery_name: "Hoppy Hour", 
          style: "blonde", 
          abv: 5, 
          ibu: 2,
          image: "https//:www.random.com",
          user_id: user.id
        }
      }
      post "/beers", params: strong_params
      beer = Beer.last
      beers = Beer.all

      delete "/beers/#{beer.id}"
      expect(response).to have_http_status(200)
      expect(beers).to be_empty
    end

  end
end
