class CreateBeers < ActiveRecord::Migration[7.0]
  def change
    create_table :beers do |t|
      t.string :beer_name
      t.string :brewery_name
      t.string :style
      t.float :abv
      t.integer :ibu
      t.text :description
      t.text :image
      t.timestamps
    end
  end
end
