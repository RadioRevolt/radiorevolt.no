var React = require('react');

var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var PopularPosts = require('./PopularPosts');

var FrontpageSidebar = React.createClass({
    render: function() {
        return (
            <div id="frontpage-sidebar-wrapper">
            	<div id="player">
            		<LargeLivePlayer />
            	</div>
            	<div id="sidebar-latest-episodes">
            		<LatestEpisodes />
            	</div>
            	<div id="sidebar-popular-posts">
            		<PopularPosts />
            	</div>
            </div>
           );
    }
});

module.exports = FrontpageSidebar;