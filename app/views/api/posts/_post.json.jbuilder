json.extract! post, :id, :title, :body, :created_at
# json.id post.id
# json.title post.title
# json.body post.body

json.author_name post.author.name
# Thank goodness we preloaded the author!
