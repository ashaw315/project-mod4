class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def show
        review = Review.find(params[:id])
       render json: review
    end

    def create
    review = Review.create!(review_params)
    render json: review, status: :created 
    end 

private

    def review_params
    params.permit(:title, :rating, :text_content, :user_id, :topic_id)
    end
end