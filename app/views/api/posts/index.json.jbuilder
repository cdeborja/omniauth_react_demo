json.array! @posts do |post|
  # jbuilder makes cool json objects
  # All methods are bang methods so they're distinguishable from keys
  # json.cool_thing "a/A"
  json.partial! "api/posts/post", post: post
end


# jbuilder is ruby!
# json.array!(@posts) do |post|
#   json.partial!("api/posts/post", post: post)
# end
