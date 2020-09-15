class User < ApplicationRecord
  has_many :game_records
  validates :name, presence: true
end
