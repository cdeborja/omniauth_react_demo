var React = require("react");
var PostStore = require("./../stores/post_store.js");
var ApiUtil = require('../utils/api_util');
var History = require('react-router').History;
var Link = require('react-router').Link;

var PostShow = React.createClass({
  getInitialState: function () {
    return { post: null };
  },

  componentDidMount: function () {
    this.postStoreToken = PostStore.addListener(
      this.setStateFromStore
    );
    ApiUtil.fetchPosts();
  },

  componentWillUnmount: function () {
    this.postStoreToken.remove();
  },

  setStateFromStore: function () {
    this.setState({ post: PostStore.find(this.props.params.id) });
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ post: PostStore.find(newProps.params.id) });

  },

  render: function () {
    if (!this.state.post) {
      return <p>Loading the post...</p>;
    }

    return (
      <article>
        <Link to="/posts">Back to posts</Link>
        <h2>{ this.state.post.title }</h2>
        <p>{ this.state.post.body }</p>
      </article>
    );
  }
});

module.exports = PostShow;
