class Post < ActiveRecord::Base
  validates :title, :body, :author_id, presence: true

  belongs_to(
    :author,
    class_name: 'Author',
    primary_key: :id,
    foreign_key: :author_id
  )

  has_one(
    :country,
    through: :author,
    source: :country
  )

  def sibling_posts
    # Post.where(author_id: author_id).where(':id IS NULL OR id != :id', id: id)
    Post.where(author_id: author_id).where.not(id: id)
  end
end
