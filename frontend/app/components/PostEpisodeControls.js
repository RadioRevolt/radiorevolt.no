var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostEpisodeControls = React.createClass({
	getInitialState: function() {
        return {
            onDemandAudioID: this.props.onDemandAudioID || null,
            podcastAudioID: this.props.podcastAudioID || null
        };
    },
    handleOnDemandAudioIDChange: function(event) {
        let value = event.target.value;
        this.setState({ onDemandAudioID: value });
    },
    handlePodcastAudioIDChange: function(event) {
        let value = event.target.value;
        this.setState({ podcastAudioID: value });
    },
    render: function() {
		return (
			<div id="post-meta-controls-wrapper">
                <div id="audio-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorFromList">Stream-on-demand-lydfil</label>
                        <select className="form-control" onChange={ this.handleOnDemandAudioIDChange } id="inputOnDemandAudio">
                            <option>1</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorText">Podkast-lydfil</label>
                        <select className="form-control" onChange={ this.handlePodcastAudioIDChange } id="inputPodcastAudio">
                            <option>1</option>
                        </select>
                    </div>
                </div>
            </div>
		);
    }
});

module.exports = PostEpisodeControls;