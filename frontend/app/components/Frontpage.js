var React = require('react');
var PostStore = require('PostStore');
var actions = require('actions');

var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var PopularPosts = require('./PopularPosts');
var PostBox = require('./PostBox');

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
            	<div id="content-block-body" className="col-md-8">
            		<PostBox title="Testartikkel" body="Lorem ipsum dolor sit amet" extraClass="col-md-6" />
            		<PostBox title="En annen artikkel" body="Lorem ipsum dolor sit amet" extraClass="col-md-6" />
            		<PostBox title="Enda en artikkel" body="Lorem ipsum dolor sit amet" extraClass="col-md-6" />
            	</div>
            	<div id="content-block-sidebar" className="col-md-4">
            		<FrontpageSidebar />
            	</div>
            </div>
           );
    }
});

module.exports = Frontpage;