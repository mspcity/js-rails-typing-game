class Game < ApplicationRecord
  belongs_to :user

  scope :order_by_score, -> {order(:score)}

  
end
