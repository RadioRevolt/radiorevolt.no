var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var SidebarPostList = React.createClass({
    render: function() {
        return (
            <div id="popular-posts-wrapper">
            	<h3>{ this.props.title }</h3>
            	<ul className="sidebar-post-list">
            		<li className="sidebar-post-list-element row"><div className="col-xs-12">
                        <img className="post-image pull-left" src="img/example2.jpg" />
                        <div className="post-program">GARASJEN</div>
                        <div className="post-title">Trumpfer dronene F35?</div>
                        <div className="post-lead">Vi snakker om Chromecast, er det egentlig bra?</div>
                    </div></li>
            		<li className="sidebar-post-list-element row"><div className="col-xs-12">
                        <img className="post-image pull-left" src="img/example2.jpg" />
                        <div className="post-program">GARASJEN</div>
                        <div className="post-title">Trumpfer dronene F35?</div>
                        <div className="post-lead">Vi snakker om Chromecast, er det egentlig bra?</div>
                    </div></li>
            	</ul>
            </div>
           );
    }
});

module.exports = SidebarPostList;