var React = require('react');
var PostStore = require('../PostStore');
var ProgramStore = require('../ProgramStore');
var AudioStore = require('../AudioStore');
var actions = require('../actions');

var PostEpisodeControls = React.createClass({
	getInitialState: function() {
        return {
            programs: ProgramStore.getPrograms() || [],
            onDemandAudioID: this.props.onDemandAudioID || null,
            podcastAudioID: this.props.podcastAudioID || null,
            onDemandForProgram: [],
            podcastForProgram: [],
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
    componentWillMount: function() {
        AudioStore.addChangeListener(this.changeState);
        ProgramStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        AudioStore.removeChangeListener(this.changeState);
        ProgramStore.removeChangeListener(this.changeState);
    },
    changeState: function() {
        this.setState({
            programs: ProgramStore.getPrograms()
        });

        if (this.state.programs.length > 0) {
            this.setState({
                onDemandForProgram: AudioStore.getOnDemandForProgram(this.programId()),
                podcastForProgram: AudioStore.getPodcastForProgram(this.programId())
            });
        }
    },
    programId: function() {
        for (let p of this.state.programs) {
            if (p.slug === this.props.programSlug) {
                return p.programID;
            }
        }
    },
    render: function() {
        let onDemandChoices = [];
        let podcastChoices = [];
        if (this.state.onDemandForProgram.length > 0 && this.state.podcastForProgram.length > 0) {
            let onDemandChoices = this.state.onDemandForProgram.map((val) => {
                return <option value={ val.id }>{ val.title }</option>;
            });
            let podcastChoices = this.state.podcastForProgram.map((val) => {
                return <option value={ val.id }>{ val.title }</option>;
            });
        }
        onDemandChoices.unshift(<option value={ null }></option>);
        podcastChoices.unshift(<option value={ null }></option>);

		return (
			<div id="post-meta-controls-wrapper">
                <div id="audio-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputAuthorFromList">Stream-on-demand-lydfil</label>
                        <select className="form-control" onChange={ this.handleOnDemandAudioIDChange } value={ this.state.onDemandAudioID } id="inputOnDemandAudio">
                            { onDemandChoices }
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputAuthorText">Podkast-lydfil</label>
                        <select className="form-control" onChange={ this.handlePodcastAudioIDChange } value={ this.state.podcastAudioID } id="inputPodcastAudio">
                            { podcastChoices }
                        </select>
                    </div>
                </div>
            </div>
		);
    }
});

module.exports = PostEpisodeControls;