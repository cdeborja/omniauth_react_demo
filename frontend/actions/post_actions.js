var AppDispatcher = require('../dispatcher/app_dispatcher');
var PostConstants = require('../constants/post_constants');

var PostActions = {
  postsReceived: function (posts) {
    var action = {
      actionType: PostConstants.POSTS_RECEIVED,
      posts: posts
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = PostActions;
