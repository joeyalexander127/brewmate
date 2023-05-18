class RemovingDescriptionColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :beers, :description
  end
end
