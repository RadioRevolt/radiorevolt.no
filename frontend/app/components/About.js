var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var About = React.createClass({
    render: function() {
        return (
            <div id="about-wrapper">
            	<p>About</p>
            </div>
           );
    }
});

module.exports = About;