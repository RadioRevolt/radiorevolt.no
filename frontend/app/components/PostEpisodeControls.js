var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostEpisodeControls = React.createClass({
	getInitialState: function() {
        return {
            broadcastDate: this.props.broadcastDate || null
        };
    },
    handleBroadcastDateChange: function(event) {
        //
    },
    render: function() {
		return (
			<div id="post-meta-controls-wrapper">
                <div id="audio-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorFromList">Stream-on-demand-lydfil</label>
                        <select className="form-control" id="inputOnDemandAudio">
                            <option>1</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorText">Podkast-lydfil</label>
                        <select className="form-control" id="inputPodcastAudio">
                            <option>1</option>
                        </select>
                    </div>
                </div>
            </div>
		);
    }
});

module.exports = PostEpisodeControls;