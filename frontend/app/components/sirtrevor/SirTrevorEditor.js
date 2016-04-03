var React = require('react');
var SirTrevor = require('sir-trevor');
var actions = require('actions');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

var SirTrevorEditor = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            sirTrevorInstance: null
        }
    },
    createSirTrevor: function() {
        this.setState({
            sirTrevorInstance: new SirTrevor.Editor({ el: this.refs.sirTrevorTextarea })
        });
    },
    componentDidMount: function() {
        document.getElementById('sirTrevorInstance').value = JSON.stringify({data: this.props.blocks});
        this.createSirTrevor();
    },
    submitForm: function() {
        this.state.sirTrevorInstance.onFormSubmit();
        var sirTrevorData = this.state.sirTrevorInstance.store.retrieve().data;

        var postBody = {
            title: "Dummytittel",
            author: "Dummyforfatter",
            program: null,
            broadcast: null,
            body: JSON.stringify(sirTrevorData),
            lead: "Dummylead"
        };

        console.log(postBody);

        var postID = this.props.postid;
        if (!postID) {
            actions.addPost(postBody);
        } else {
            actions.updatePost(postID, postBody);
        }
    },
    render: function() {
        console.log(this.state.sirTrevorInstance);
		return (
			<div id="sir-trevor-editor-wrapper">
				<form>
                    <textarea id='sirTrevorInstance' ref="sirTrevorTextarea"></textarea>
                    <button id="submitButton" type="submit" className="btn btn-primary pull-right" autocomplete="off" onClick={ this.submitForm }>Lagre</button>
                </form>
            </div>
		)
    }
});

module.exports = SirTrevorEditor;