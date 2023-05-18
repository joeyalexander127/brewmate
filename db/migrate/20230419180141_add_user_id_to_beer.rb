class AddUserIdToBeer < ActiveRecord::Migration[7.0]
  def change
    add_column :beers, :user_id, :integer
  end
end
