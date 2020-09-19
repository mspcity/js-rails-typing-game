class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users, include: [:games]
  end

  # GET /users/1
  def show
    render json: @user, include: [:games]
  end

  # POST /users
  def create
    @user = User.find_or_create_by(name: user_params[:name])
    @user.games.build(score: game_params[:score])
    if @user.save
      render json: @user, include: [:games], status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    # @user.games.destroy
    render json: @user, include: [:games]
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :high_score)
    end

    def game_params
      params.require(:game).permit(:score, :user_id)
    end
end
