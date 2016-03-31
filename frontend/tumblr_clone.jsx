var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var App = require("./components/app.jsx");
var PostList = require("./components/post_list.jsx");
var PostShow = require("./components/post_show.jsx");
var LoginForm = require("./components/login_form.jsx");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var SessionStore = require("./stores/session_store");

var ApiUtil = require("./utils/api_util");

window.initializeApp = function () {
  ReactDOM.render(
    <Router history={hashHistory} >
      <Route path="/" component={App}>
        <Route path="posts" component={PostList} onEnter={_requireLoggedIn}/>
        <Route path="posts/:id" component={PostShow}/>
      </Route>

      <Route path="/login" component={LoginForm}/>

    </Router>,
    document.getElementById("content")
  );
};

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }

    asyncCompletionCallback();
  }
}
