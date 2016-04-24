var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var HeaderLogo = React.createClass({
    render: function() {
        return (
            <div id="header-logo-wrapper">
            	<Link to={'/'}><img src="img/radiorevolt.jpg" id="header-logo" /></Link>
            </div>
           );
    }
});

module.exports = HeaderLogo;