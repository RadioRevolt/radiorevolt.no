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
        let authorFromList = this.refs.postMetaControls.state.authorFromList;

        let author = "";
        if (authorText.length > 0 && authorFromList.length > 0) {
            let author = authorText + ", " + authorFromList;
        } else if (authorText.length > 0) {
            let author = authorText;
        } else if (authorFromList.length > 0) {
            let author = authorFromList;
        }

        let program = this.refs.postMetaControls.state.program;

        var postBody = {
            title: heading,
            author: author,
            program: program,
            broadcast: null,
            body: JSON.stringify(sirTrevorData),
            lead: this.state.listLead
        };

        console.log(postBody);

        actions.addPost(postBody);
    },
    render: function() {
        let blocks = [
            {"type": "heading", "data": {"text": "Overskrift", "format": "html"}},
            {"type": "text", "data": {"text": "<p>Brødtekst</p>", "format": "html"}}
        ];
		return (
			<div id="post-wrapper">
                <PostMetaControls ref="postMetaControls" />
				<SirTrevorEditor blocks={ blocks } instanceSetter={ this.sirTrevorInstanceSetter } />
                <div className="form-group">
                    <label for="list-lead">Sammendrag</label>
                    <textarea className="form-control" rows="4" onChange={ this.handleListLeadChange } id="list-lead" placeholder="Vises i lister" />
                </div>
                <PostEpisodeControls ref="postEpisodeControls" />
                <button id="submitButton" type="submit" className="btn btn-primary pull-right" autocomplete="off" onClick={ this.submitForm }>Opprett</button>
            </div>
		);
    }
});

module.exports = PostCreator;