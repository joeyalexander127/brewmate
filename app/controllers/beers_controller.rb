class BeersController < ApplicationController

    def index
        beers = Beer.all
        render json: beers
    end

    def create 
        beer = Beer.create(strong_params)
        if beer.valid? 
            render json: beer
        else
            render json: beer.errors, status: 422
        end
    end


    def update
        beer = Beer.find(params[:id])
        beer.update(strong_params)
        if beer.valid?
            render json: beer
        else
            render json: beer.errors, status: 422
        end
    end

    def destroy
        beer = Beer.find(params[:id])
        beer.destroy
        if beer.valid?
            render json: beer

        end
    end

    def suggested_beers 
        # user param
        user = User.find(params[:user_id])
        # getting avgerage IBU
        avg_ibu = user.likes.includes(:beer).average(:ibu).to_i
        # getting average ABV
        avg_abv = user.likes.includes(:beer).average(:abv)
        # Variable used for making sure already liked beers dont show up in  suggestions
        already_liked_beer_ids = user.likes.pluck(:beer_id)

        # gets the number one liked style
        top_styles = top_styles = user.likes.joins(:beer).group('beers.style').count.sort_by {|_key, value|value}.reverse.map {|beer| beer[0]}

        # gets the top 5 suggested based off style
        suggested_style = Beer.where.not(id: already_liked_beer_ids).where(style: top_styles).limit(5)

        # gets the top 5 suggested based off abv
        suggested_abv = Beer.where.not(id: already_liked_beer_ids)
                    .sort_by { |beer| (beer.abv - avg_abv).abs }
                    .first(5)

        # gets the top 5 suggested based off IBU
        suggested_ibu = Beer.where.not(id: already_liked_beer_ids).where.not(ibu: 0)
                  .sort_by { |beer| (beer.ibu - avg_ibu).abs }
                  .first(5)

        # renders all suggestions as an object
        render json: {ibu_suggested: suggested_ibu, abv_suggested: suggested_abv, style_suggested: suggested_style, ibu: avg_ibu, abv: avg_abv}
    end

    def charts_data 
        user = User.find(params[:user_id])
        top_liked_styles =  user.likes.joins(:beer).group('beers.style').count.sort_by {|_key, value|value}.reverse
        render json: top_liked_styles
    end

    private
    def strong_params
        params.require(:beer).permit(:beer_name, :brewery_name, :style, :abv, :ibu, :image, :user_id)
    end
end
