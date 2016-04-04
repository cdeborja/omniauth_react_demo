class AddProviderAndUidToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :uid, :string
    add_column :authors, :provider, :string
  end
end
