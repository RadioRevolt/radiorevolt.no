var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var HeaderLogo = React.createClass({
    render: function() {
        return (
            <div id="header-logo-wrapper">
            	<img src="img/logo_black.png" id="header-logo" />
            </div>
           );
    }
});

module.exports = HeaderLogo;