class User < ApplicationRecord
  has_many :games, dependent: :destroy
  validates :name, presence: true

  scope :search_by_name, -> (name){where("name = ?", name)}
end
