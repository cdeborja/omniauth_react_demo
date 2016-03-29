var React = require("react");
var PostStore = require("./../stores/post_store.js");
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ApiUtil = require('../utils/api_util');
var Link = require('react-router').Link;

var PostList = React.createClass({

  // JS REVIEW
  // 1) Method style: myObject.myMethod()
  // this is myObject
  // 2) Function style: myMethod()
  // this is global object/window or undefined if using strict
  // 3) Constructor style: new myClass()
  // this is new, blank object/instance
  getInitialState: function () {
    return { posts: [], postsLength: 0 };
  },

  componentDidMount: function () {


    this.postStoreToken = PostStore.addListener(this.setStateFromStore); // hey, I care. Let me know what you're up to.
    // PostStore.fetch();
    // PostStore.fetch(function (posts) {
    //   debugger;
    // }.bind(this));
    ApiUtil.fetchPosts();
  },


  componentWillUnmount: function () {
    // PostStore.removeChangeHandler(this.setStateFromStore);
    this.postStoreToken.remove();
  },

  setStateFromStore: function () {
    // HERE is where we want to setState to all the new posts
    // this.setState({ posts: PostStore.all(), postsLength: PostStore.all().length });
    // postsLength should NOT be in state. Because you can compute it on the fly
    this.setState({ posts: PostStore.all()} );

  },

  render: function () {

    var postArticles = this.state.posts.map(function (post, i) {
      return (
        <article key={ i }>
          <h3>
            <Link to={"/posts/" + post.id}>
              { post.title }
            </Link>
          </h3>
          <footer>{ post.author_name }</footer>
          <p>{ post.body }</p>
        </article>
      );
    });

    if (postArticles.length === 0) {
      postArticles = <p>Loading posts...</p>;
    }
    return (
      <section className="posts">
        {this.props.children}
        <hr />
        <h2>All the Posts!!!!({this.state.postsLength})</h2>
        { postArticles }
      </section>
    );
  }

});

module.exports = PostList;
