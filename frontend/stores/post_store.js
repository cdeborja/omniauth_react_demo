var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var PostConstants = require('../constants/post_constants');

var PostStore = new Store(AppDispatcher);

// debugger

var _posts = {};

var _callbacks = [];

var resetPosts = function (posts) {
  _posts = {}; // reset!
  posts.forEach(function (post) {
    _posts[post.id] = post;
  });
};


// Our Store is going to keep track of all the posts we have in _posts
// Interface between backend and React components

PostStore.all = function () {
  // return _posts.slice();
  // all the posts! Slice 'em so that component can't modify the store

  var posts = [];
  // Way of iterating through keys of object
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

// var PostStore = {
//   // _posts: [],  But then I can do PostStore._posts
//
//   addChangeHandler: function (handler) {
//     _callbacks.push(handler);
//   },
//
//   removeChangeHandler: function (handler) {
//     for (var i = 0; i < _callbacks.length; i++) {
//       if (_callbacks[i] === handler) {
//         _callbacks.splice(i, 1);
//         return;
//       }
//     }
//   },
//
//   changed: function () {
//     _callbacks.forEach(function (handler) {
//       handler();
//     });
//   },
//
// PostStore.fetch =  function () {
//   $.ajax({
//     type: "GET",
//     url: "/api/posts",
//     dataType: "json",
//     success: function (posts) {
//       // posts is an array of post objects
//       _posts = {}; // reset!
//       posts.forEach(function (post) {
//         _posts[post.id] = post;
//       });
//       // Imagine that multiple React components depended on the posts
//       // They need to know when the PostStore changes!
//       // So they can all register change handlers with the PostStore on ComponentDidMount
//       // When the posts are fetched, the PostStore iterates through all the change handlers
//       // Says "hey components, I have new posts! Do your thing"
//
//       // TWO UNDERSCORES
//       PostStore.__emitChange();
//     },
//     error: function () {
//       console.log("PostStore#fetch error!");
//     }
//   });
// };
