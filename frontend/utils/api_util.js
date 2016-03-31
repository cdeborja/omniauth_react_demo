var AppDispatcher = require('../dispatcher/app_dispatcher');
var PostActions = require('../actions/post_actions');
var SessionActions = require('../actions/session_actions');
var SessionStore = require('../stores/session_store');

var ApiUtil = {
  fetchPosts: function () {
    $.ajax({
      type: "GET",
      url: "/api/posts",
      dataType: "json",
      success: function (posts) {
        PostActions.postsReceived(posts);
      },
      error: function () {
        console.log("Api#fetch error!");
      }
    });
  },

  login: function(credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      }
    });
  },

  logout: function() {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function() {
        SessionActions.logout();
      }
    });
  },

  fetchCurrentUser: function(completion) {
    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      complete: function() {
        completion && completion();
      }
    })
  }
};

module.exports = ApiUtil;
