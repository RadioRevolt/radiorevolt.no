var React = require('react');
var PostStore = require('../PostStore');
var ProgramStore = require('../ProgramStore');

var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var SidebarPostList = require('./SidebarPostList');

var FrontpageSidebar = React.createClass({
    getInitialState: function() {
        return {
            latestBroadcasts: PostStore.getRecentBroadcasts(5),
            popularPosts: PostStore.getRecentPosts(5),
            programs: ProgramStore.getPrograms()
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
            latestBroadcasts: PostStore.getRecentBroadcasts(5),
            popularPosts: PostStore.getRecentPosts(5),
            programs: ProgramStore.getPrograms()
        });
    },
    render: function() {
        return (
            <div id="frontpage-sidebar-wrapper">
            	<div id="sidebar-latest-episodes">
            		<SidebarPostList title="Siste episoder" programs={ this.state.programs } posts={ this.state.latestBroadcasts } />
            	</div>
            	<div id="sidebar-popular-posts">
            		<SidebarPostList title="Populært nå" programs={ this.state.programs } posts={ this.state.popularPosts } />
            	</div>
            </div>
           );
    }
});

module.exports = FrontpageSidebar;