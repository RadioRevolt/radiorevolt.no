var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var SirTrevorEditor = require('./sirtrevor/SirTrevorEditor');

var PostCreator = React.createClass({
	getInitialState: function() {
        return {
            sirTrevorInstance: null
        };
    },
    sirTrevorInstanceSetter: function(instance) {
        this.setState({ sirTrevorInstance: instance });
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

        actions.addPost(postBody);
    },
    render: function() {
		return (
			<div id="post-wrapper">
				<SirTrevorEditor blocks={[]} instanceSetter={ this.sirTrevorInstanceSetter } />
                <button id="submitButton" type="submit" className="btn btn-primary pull-right" autocomplete="off" onClick={ this.submitForm }>Lagre</button>
            </div>
		);
    }
});

module.exports = PostCreator;