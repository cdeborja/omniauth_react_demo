class CreateAuthorCountries < ActiveRecord::Migration
  
  def up
    create_table :author_countries do |t|
      t.integer :author_id, null: false
      t.integer :country_id, null: false

      t.timestamps
    end
    
    add_index :author_countries, :author_id
    add_index :author_countries, :country_id
    
    Author.all.each do |author|
      author.author_countries.create!(
        country_id: author.country_id
      )
    end
    
    remove_column :authors, :country_id
  end
  
  
  def down
    add_column :authors, :country_id, :integer
    
    Author.includes(:author_countries).each do |author|
      country_id = author.author_countries[0].country_id
      author.update!(country_id: country_id)
    end
    
    change_column :authors, :country_id, :integer, null: false
    drop_table :author_countries
  end
  
end