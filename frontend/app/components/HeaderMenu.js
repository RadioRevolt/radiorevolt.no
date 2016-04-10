var React = require('react');
var ReactRouter = require('react-router');
var PostStore = require('../PostStore');
var actions = require('../actions');

var Link = ReactRouter.Link;

var HeaderMenu = React.createClass({
    render: function() {
        return (
            <div id="header-menu-wrapper">
            	<ul id="header-menu">
            		<li><Link to={'/programmer/'}>PROGRAMMER</Link></li>
            		<li><Link to={'/om/'}>OM OSS</Link></li>
            	</ul>
            </div>
           );
    }
});

module.exports = HeaderMenu;