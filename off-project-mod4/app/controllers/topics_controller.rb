class TopicsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    def index
        topics = Topic.all
        render json: topics
    end

    def show
        topic = Topic.find(params[:id])
        render json: topic, serializer: TopicWithReviewsSerializer
    end

    def create
        topic = Topic.create!(topic_params)
        # topic.reviews.first.delete
        topic.reviews.create!(review_params)
        render json: topic, status: :created 
    end 


    private 

    def topic_params
        params.require(:topic).permit(:title)
    end

    def review_params
       params.require(:review).permit(:title, :rating, :text_content, :user_id)
    end

end
