var React = require('react');
var ReactRouter = require('react-router');
var Store = require('../Store');
var actions = require('../actions');

var Link = ReactRouter.Link;

var HeaderMenu = React.createClass({
    render: function() {
        return (
            <div id="header-menu-wrapper">
            	<ul id="header-menu">
            		<li><Link to={'/programmer/'}>Programmer</Link></li>
            		<li><Link to={'/om/'}>Om oss</Link></li>
            	</ul>
            </div>
           );
    }
});

module.exports = HeaderMenu;