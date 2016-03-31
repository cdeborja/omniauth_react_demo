var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var PostConstants = require('../constants/post_constants');

var PostStore = new Store(AppDispatcher);

var _posts = {};

var _callbacks = [];

var resetPosts = function (posts) {
  _posts = {}; // reset!
  posts.forEach(function (post) {
    _posts[post.id] = post;
  });
};


PostStore.all = function () {

  var posts = [];

  for (var id in _posts) {
    if (_posts.hasOwnProperty(id)) {
      posts.push(_posts[id]);
    }
  }
  return posts;
};

PostStore.find = function (id) {
  return _posts[id];
};



PostStore.__onDispatch = function (payload) {
  // this is called by the dispatcher whenever AppDispatcher.dispatch is called.

  switch (payload.actionType) {
    case PostConstants.POSTS_RECEIVED:
      resetPosts(payload.posts);
      PostStore.__emitChange();
      break;
  }
};

module.exports = PostStore;
