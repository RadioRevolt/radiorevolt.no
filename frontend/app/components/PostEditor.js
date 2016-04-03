var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var SirTrevorEditor = require('./sirtrevor/SirTrevorEditor');

var PostEditor = React.createClass({
	getInitialState: function() {
        return {
            post: PostStore.getPostDetails(this.props.params.postid),
            sirTrevorInstance: null
        };
    },
    componentWillMount: function() {
        PostStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        PostStore.removeChangeListener(this.changeState);
    },
    componentWillReceiveProps: function(nextProps) {
        this.changeState(nextProps.params.postid);
    },
    changeState: function(id) {
    	if (id == undefined) {
    		id = this.props.params.postid;
    	}
        this.setState({
            post: PostStore.getPostDetails(id)
        });
    },
    sirTrevorInstanceSetter: function(instance) {
        console.log("Called!");
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

        var postID = this.props.params.postid;
        actions.updatePost(postID, postBody);
    },
    render: function() {
    	if (Object.keys(this.state.post).length !== 0) {
    		return (
    			<div id="post-wrapper">
    				<SirTrevorEditor blocks={ JSON.parse(this.state.post.body) } instanceSetter={ this.sirTrevorInstanceSetter } />
                    <button id="submitButton" type="submit" className="btn btn-primary pull-right" autocomplete="off" onClick={ this.submitForm }>Lagre</button>
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