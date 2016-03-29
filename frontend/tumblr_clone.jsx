var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var PostList = require("./components/post_list.jsx");
var PostShow = require("./components/post_show.jsx");


var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
  // navigate with window.location.hash
  // URLs with # avoid making HTTP requests
    // Nice for navigating single-page apps
    //en.wikipedia.org/wiki/Oppenheimer_security_hearing#References
        // Before '#' is for server, after '#' is for browser (the hash fragment)
        // React Router adds a react key to the query string...you can get rid of this using other types of history
        // i.e. NOT hashHistory, but maybe pushState

  // React Router listen for changes in the hash fragment
    // Mounts and unmounts components as necessary



    // <Route path="/posts/new" component={MadeUp} />
    // make sure /new comes before /:id
    // Or else the router will mount PostShow with prop.params.id = "new"

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Tumbler</h1>
        {this.props.children}
        // You NEED this.props.children to render the components in the children routes
      </div>
    );
  }
});

window.initializeApp = function () {
  ReactDOM.render(
    <Router history={hashHistory} >
      <Route path="/" component={App} >
        <IndexRoute component={PostList} />
        <Route path="posts/:id/" component={PostShow} >
          // <IndexRoute component={CommentList} /> you could put <CommentList /> in render of PostShow instead
          <Route path="comments" component={CommentList} />
          // Now having "comments" to the url will add the CommentList to PostShow.props.children
          // If we remembered to render this.props.children in PostShow, then navigating from posts/31 to posts/31/comments
          // will add CommentList to the page
        </Route>

        <Route path="posts" component={PostList} />
      </Route>
    </Router>,
    $("main")[0]
    // don't NEED jQuery but it's nice
  );
};
