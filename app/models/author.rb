class Author < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token!

  has_many :author_countries
  has_many :countries, through: :author_countries

  has_many(
    :posts,
    class_name: 'Post',
    primary_key: :id,
    foreign_key: :author_id
  )

  def self.num_posts
    num_posts = {}

    Author
      .joins("LEFT OUTER JOIN posts ON posts.author_id = authors.id")
      .group(:id)
      .select("authors.*, COUNT(posts.id) AS num_posts")
      .each do |author|
        num_posts[author] = author.num_posts
      end

    num_posts
  end

  def self.find_by_credentials(name, password)
    user = Author.find_by(name: name)
    user && user.valid_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    author = Author.find_by(provider: provider, uid: uid)
    return author if author

    Author.create(
      provider: provider,
      uid: uid,
      name: auth_hash[:extra][:raw_info][:name]
    )
  end

  def self.random_code
    code = SecureRandom::urlsafe_base64;
    while exists?(session_token: code)
      code = SecureRandom::urlsafe_base64
    end
    code
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.update(session_token: self.class.random_code)
    self.session_token
  end

  private

  def ensure_session_token!
    self.session_token = self.class.random_code
  end

end
