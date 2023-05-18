require 'csv'


User.create({ email: 'brewmate@testing.com', password: 'brewmate123'})
User.create({ email: 'beerdb@testing.com', password: 'brewmate123'})

CSV.foreach(Rails.root.join('lib/seed_csv/seed-may-01.csv'), headers: true) do |row|
    Beer.create( {
    user_id: row["user_id"],
    beer_name: row["beer_name"], 
    brewery_name: row["brewery_name"],
    abv: row["abv"], 
    ibu: row["ibu"],
    style: row["style"],
    image: row["image"]
  } 
)   
print "beer created"
end