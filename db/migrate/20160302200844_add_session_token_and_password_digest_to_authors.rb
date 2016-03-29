class AddSessionTokenAndPasswordDigestToAuthors < ActiveRecord::Migration
  def change
    add_column :authors, :session_token, :string
    add_column :authors, :password_digest, :string
  end
end
