var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostMetaControls = require('./PostMetaControls');
var PostEpisodeControls = require('./PostEpisodeControls');
var SirTrevorEditor = require('./sirtrevor/SirTrevorEditor');

var PostCreator = React.createClass({
	getInitialState: function() {
        return {
            sirTrevorInstance: null,
            listLead: ""
        };
    },
    sirTrevorInstanceSetter: function(instance) {
        this.setState({ sirTrevorInstance: instance });
    },
    handleListLeadChange: function(event) {
        let value = event.target.value;
        this.setState({ listLead: value });
    },
    componentWillReceiveProps: function(nextProps) {
        this.changeState(nextProps.params.programslug);
    },
    submitForm: function() {
        this.state.sirTrevorInstance.onFormSubmit();
        var sirTrevorData = this.state.sirTrevorInstance.store.retrieve().data;

        let heading = "INGEN OVERSKRIFT SATT";
        sirTrevorData.forEach((each) => {
            if (each.type == 'heading') {
                heading = each.data.text;
            }
        });

        let authorText = this.refs.postMetaControls.state.authorText;
        let authorUsername = this.refs.postMetaControls.state.authorUsername;
        let programSlug = this.refs.postMetaControls.state.program;

        let program = null;
        for (let p of this.state.programs) {
            if (p.slug == programSlug) {
                program = p._id;
                break;
            }
        }

        let onDemandAudioID = this.refs.postEpisodeControls.state.onDemandAudioID || null;
        let podcastAudioID = this.refs.postEpisodeControls.state.podcastAudioID || null;

        var postBody = {
            title: heading,
            author_username: authorUsername,
            author_text: authorText,
            program: program,
            broadcast: {
                onDemandAudioID: onDemandAudioID,
                podcastAudioID: podcastAudioID
            },
            body: JSON.stringify(sirTrevorData),
            lead: this.state.lead
        };

        actions.addPost(postBody);
    },
    render: function() {
        let blocks = [
            {"type": "heading", "data": {"text": "Overskrift", "format": "html"}},
            {"type": "text", "data": {"text": "<p>Brødtekst</p>", "format": "html"}}
        ];
		return (
			<div id="post-editor-wrapper">
                <PostMetaControls
                    ref="postMetaControls"
                    program={ this.props.params.programslug }
                />
				<SirTrevorEditor blocks={ blocks } instanceSetter={ this.sirTrevorInstanceSetter } />
                <div className="form-group">
                    <label htmlFor="list-lead">Sammendrag</label>
                    <textarea className="form-control" rows="4" onChange={ this.handleListLeadChange } id="list-lead" placeholder="Vises i lister" />
                </div>
                <PostEpisodeControls
                    ref="postEpisodeControls"
                    programSlug={ this.props.params.programslug }
                />
                <button id="submitButton" type="submit" className="btn btn-primary pull-right" autoComplete="off" onClick={ this.submitForm }>Opprett</button>
            </div>
		);
    }
});

module.exports = PostCreator;