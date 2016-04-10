var React = require('react');

var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var SidebarPostList = require('./SidebarPostList');

var FrontpageSidebar = React.createClass({
    render: function() {
        return (
            <div id="frontpage-sidebar-wrapper">
            	<div id="player">
            		<LargeLivePlayer />
            	</div>
            	<div id="sidebar-latest-episodes">
            		<SidebarPostList title="Siste episoder" posts={ this.props.latestEpisodes } />
            	</div>
            	<div id="sidebar-popular-posts">
            		<SidebarPostList title="Populært nå" posts={ this.props.popularPosts } />
            	</div>
            </div>
           );
    }
});

module.exports = FrontpageSidebar;