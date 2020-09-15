require 'test_helper'

class GameRecordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @game_record = game_records(:one)
  end

  test "should get index" do
    get game_records_url, as: :json
    assert_response :success
  end

  test "should create game_record" do
    assert_difference('GameRecord.count') do
      post game_records_url, params: { game_record: { score: @game_record.score, user_id: @game_record.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show game_record" do
    get game_record_url(@game_record), as: :json
    assert_response :success
  end

  test "should update game_record" do
    patch game_record_url(@game_record), params: { game_record: { score: @game_record.score, user_id: @game_record.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy game_record" do
    assert_difference('GameRecord.count', -1) do
      delete game_record_url(@game_record), as: :json
    end

    assert_response 204
  end
end
