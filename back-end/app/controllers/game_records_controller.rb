class GameRecordsController < ApplicationController
  before_action :set_game_record, only: [:show, :update, :destroy]

  # GET /game_records
  def index
    @game_records = GameRecord.all

    render json: @game_records
  end

  # GET /game_records/1
  def show
    render json: @game_record
  end

  # POST /game_records
  def create
    @game_record = GameRecord.new(game_record_params)

    if @game_record.save
      render json: @game_record, status: :created, location: @game_record
    else
      render json: @game_record.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /game_records/1
  def update
    if @game_record.update(game_record_params)
      render json: @game_record
    else
      render json: @game_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /game_records/1
  def destroy
    @game_record.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game_record
      @game_record = GameRecord.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def game_record_params
      params.require(:game_record).permit(:score, :user_id)
    end
end
