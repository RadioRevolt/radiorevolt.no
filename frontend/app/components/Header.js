var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var HeaderLogo = require('./HeaderLogo');
var HeaderMenu = require('./HeaderMenu');

var Header = React.createClass({
    render: function() {
        return (
            <div id="header-wrapper">
            	<div id="header-left">
            		<HeaderLogo />
            	</div>
            	<div id="header-right">
            		<HeaderMenu />
            	</div>
            </div>
           );
    }
});

module.exports = Header;