var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var Post = React.createClass({
	getInitialState: function() {
        return {
            post: PostStore.getPostDetails(this.props.params.postid)
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
    render: function() {
    	if (Object.keys(this.state.post).length !== 0) {
    		// SirTrevor.js-logikk skal inn her
    		return (
    			<div id="post-wrapper">
    				<h1>{ this.state.post.post.title }</h1>
    				<p>{ this.state.post.post.title }</p>
	            </div>
    		)
    	} else {
	    	return (
	            <div id="post-wrapper">
	            </div>
           );
	    }
    }
});

module.exports = Post;