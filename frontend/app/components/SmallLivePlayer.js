var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var SmallLivePlayer = React.createClass({
	playLive: function() {
		window.revoltPlayer.playLive(0);
	},
    render: function() {
        return (
            <div id="small-live-player-wrapper" className="row">
            	<a target="_blank" onClick={ this.playLive } className="play-live-button"><div className="pull-left play-button">
            		<span className="glyphicon glyphicon-play" aria-hidden="true"></span>
            	</div></a>
            	<div className="show-info">
            		<div id="live-now-text">LIVE NÅ:</div>
            		<div id="program-name">Garasjen</div>
            		<div id="currently-playing">Erlend Elvesveen &ndash; Betal meg i sølv</div>
            		<div id="dab-info">Hør oss også på DAB+ i trondheimsregionen!</div>
            	</div>
            </div>
           );
    }
});

module.exports = SmallLivePlayer;