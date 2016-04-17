var React = require('react');
var PostStore = require('PostStore');
var actions = require('actions');

var SmallLivePlayer = React.createClass({
    render: function() {
        return (
            <div id="small-live-player-wrapper" className="row">
            	<div className="pull-left play-button">
            		<span className="glyphicon glyphicon-play" aria-hidden="true"></span>
            	</div>
            	<div className="show-info">
            		<div id="live-now-text">LIVE NÅ:</div>
            		<div id="program-name">Garasjen</div>
            		<div id="currently-playing">Erlend Elvesveen &ndash; Betal meg i sølv</div>
            	</div>
            </div>
           );
    }
});

module.exports = SmallLivePlayer;