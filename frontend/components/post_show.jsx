var React = require("react");
var PostStore = require("./../stores/post_store.js");
// var AppDispatcher = require('../dispatcher/app_dispatcher');
var ApiUtil = require('../utils/api_util');
var History = require('react-router').History;

var PostShow = React.createClass({
  // mixins is keyWord for react class
  // mixins: [History],

  getInitialState: function () {
    return { post: null };
  },

  componentDidMount: function () {
    this.postStoreToken = PostStore.addListener(
      this.setStateFromStore
    );
    ApiUtil.fetchPosts();
    console.log("SHOW ME");
  },

  componentWillUnmount: function () {
    this.postStoreToken.remove();
  },

  setStateFromStore: function () {
    // Not good enough when you change the URL params.id
    // This listener won't be called because the component wasn't mounted again
    this.setState({ post: PostStore.find(this.props.params.id) });
  },

  componentWillReceiveProps: function (newProps) {
    // This will be called automatically whenever the props change (from different URL)
    // this.setStateFromStore() won't work because this.props still has old values
    this.setState({ post: PostStore.find(newProps.params.id) });

  },

  _goBack: function () {
    // Do lots of things
    setTimeout(function () {
      this.props.history.pushState(null, "/posts");
    }.bind(this), 1000);
  },

  render: function () {
    if (!this.state.post) {
      return <p>Loading the post...</p>;
    }

    return (
      <article>
        <button onClick={this._goBack}>
          DO SOMETHING AND THEN GO BACK. please
        </button>
        <h2>{ this.state.post.title }</h2>
        <p>{ this.state.post.body }</p>
      </article>
    );
  }
});

module.exports = PostShow;
