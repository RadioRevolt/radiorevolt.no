var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostMetaControls = require('./PostMetaControls');
var PostEpisodeControls = require('./PostEpisodeControls');
var SirTrevorEditor = require('./sirtrevor/SirTrevorEditor');

var PostEditor = React.createClass({
	getInitialState: function() {
        return {
            post: PostStore.getPostDetails(this.props.params.postid),
            sirTrevorInstance: null,
            programs: ProgramStore.getPrograms(),
            lead: ""
        };
    },
    componentWillMount: function() {
        PostStore.addChangeListener(this.changeState);
        ProgramStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        PostStore.removeChangeListener(this.changeState);
        ProgramStore.removeChangeListener(this.changeState);
    },
    componentWillReceiveProps: function(nextProps) {
        this.changeState(nextProps.params.postid);
        this.changeState(nextProps.params.programslug);
    },
    changeState: function(id) {
    	if (id == undefined) {
    		id = this.props.params.postid;
    	}
        this.setState({
            post: PostStore.getPostDetails(id),
            programs: ProgramStore.getPrograms()
        });
    },
    sirTrevorInstanceSetter: function(instance) {
        this.setState({ sirTrevorInstance: instance });
    },
    handleListLeadChange: function(event) {
        let value = event.target.value;
        this.setState({ lead: value });
    },
    validateForm: function(postBody) {
        if (postBody.author_text.length == 0 && postBody.author_username == null) {
            return false;
        }

        if (postBody.title.length == 0) {
            return false;
        }

        if (postBody.program == null) {
            return false;
        }

        if (postBody.lead.length == 0) {
            return false;
        }

        return true;
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
        let authorUsername = this.refs.postMetaControls.state.authorUsername || null;
        let programSlug = this.refs.postMetaControls.state.program;

        let program = null;
        for (let p of this.state.programs) {
            if (p.slug == programSlug) {
                program = p._id;
                break;
            }
        }

        var postBody = {
            title: heading,
            author_username: authorUsername,
            author_text: authorText,
            program: program,
            broadcast: null,
            body: JSON.stringify(sirTrevorData),
            lead: this.state.lead
        };

        console.log(postBody);

        var valid = this.validateForm(postBody);

        if (valid) {
            actions.updatePost(this.props.params.postid, postBody);
        } else {
            console.log("invalid post");
        }
    },
    render: function() {
        console.log(this.state.post);
    	if (Object.keys(this.state.post).length !== 0) {
    		return (
                <div id="post-editor-wrapper">
                    <PostMetaControls
                        ref="postMetaControls"
                        program={ this.props.params.programslug }
                        authorUsername={ this.state.post.author_username }
                        authorText={ this.state.post.author_text }
                        date={ this.state.post.date }
                    />
                    <SirTrevorEditor blocks={ JSON.parse(this.state.post.body) } instanceSetter={ this.sirTrevorInstanceSetter } />
                    <div className="form-group">
                        <label htmlFor="list-lead">Sammendrag</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={ this.handleListLeadChange }
                            id="list-lead"
                            placeholder="Vises i lister"
                            text={ this.state.post.lead }
                        />
                    </div>
                    <PostEpisodeControls
                        ref="postEpisodeControls"
                        onDemandAudioID={ this.state.post.onDemandAudioID }
                        podcastAudioID={ this.state.post.podcastAudioID }
                        programSlug={ this.props.params.programslug }
                    />
                    <button id="submitButton" type="submit" className="btn btn-primary pull-right" autoComplete="off" onClick={ this.submitForm }>Lagre</button>
                </div>
    		);
    	} else {
	    	return (
	            <div id="post-wrapper">
	            </div>
           );
	    }
    }
});

module.exports = PostEditor;