var React = require('react');
var PostStore = require('PostStore');
var actions = require('actions');

var FrontpageSidebar = require('./FrontpageSidebar');
var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var PopularPosts = require('./PopularPosts');
var PostBox = require('./PostBox');

var Frontpage = React.createClass({
    getInitialState: function() {
        return {
            posts: PostStore.getRecentPosts(6)
        };
    },
    componentWillMount: function() {
        PostStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        PostStore.removeChangeListener(this.changeState);
    },
    changeState: function() {
        this.setState({
            posts: PostStore.getRecentPosts(6)
        });
    },
    renderPost: function(post) {
        return (
            <PostBox title={ post.title } body={ post.lead } extraClass="col-md-6" />
        );
    },
    render: function() {
        let posts = this.state.posts.map(this.renderPost);

        return (
            <div id="frontpage-wrapper">
            	<div id="content-block-body" className="col-md-8">
            		{ posts }
            	</div>
            	<div id="content-block-sidebar" className="col-md-4">
            		<FrontpageSidebar />
            	</div>
            </div>
           );
    }
});

module.exports = Frontpage;