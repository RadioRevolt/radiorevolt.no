var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var LatestEpisodes = React.createClass({
    render: function() {
        return (
            <div id="latest-episodes-wrapper">
            	<h3>Siste episoder</h3>
            	<ul>
            		<li>Garasjen 2</li>
            		<li>Garasjen 1</li>
            	</ul>
            </div>
           );
    }
});

module.exports = LatestEpisodes;