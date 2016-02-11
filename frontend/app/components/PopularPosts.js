var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var PopularPosts = React.createClass({
    render: function() {
        return (
            <div id="popular-posts-wrapper">
            	<h3>Populære poster</h3>
            	<ul>
            		<li>Garasjen syter</li>
            		<li>Garasjen klager</li>
            	</ul>
            </div>
           );
    }
});

module.exports = PopularPosts;