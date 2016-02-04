var React = require('react');
var Store = require('Store');
var actions = require('actions');

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

var Frontpage = React.createClass({
    render: function() {
        return (
            <div id="frontpage-wrapper">
            	<div id="content-block-body">
            		Frontpage
            	</div>
            	<div id="content-block-sidebar">
            		<FrontpageSidebar />
            	</div>
            </div>
           );
    }
});

module.exports = Frontpage;