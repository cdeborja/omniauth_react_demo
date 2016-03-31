var React = require("react");
var PostStore = require("./../stores/post_store.js");
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ApiUtil = require('../utils/api_util');
var Link = require('react-router').Link;

var PostList = React.createClass({
  getInitialState: function () {
    return { posts: [] };
  },

  componentDidMount: function () {
    this.postStoreToken = PostStore.addListener(this.setStateFromStore);
    ApiUtil.fetchPosts();
  },

  componentWillUnmount: function () {
    this.postStoreToken.remove();
  },

  setStateFromStore: function () {
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
        <h2>All the Posts! ({this.state.posts.length})</h2>
        { postArticles }
      </section>
    );
  }

});

module.exports = PostList;
