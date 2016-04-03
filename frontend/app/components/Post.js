var React = require('react');
var PostStore = require('PostStore');	
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var RenderedPost = require('./sirtrevor/RenderedPost');

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
    	var sirTrevorBlocks = [
    		{"type":"text","data":{"text":"Hello, I'm **Sir Trevor**.\nCreate some new blocks and see _what I can do_.\n"}},
    		{"type":"video","data":{"source":"youtube","remote_id":"hcFLFpmc4Pg"}}
		];

    	if (Object.keys(this.state.post).length !== 0) {
    		// SirTrevor.js-logikk skal inn her
    		console.log(this.props);
    		return (
    			<div id="post-wrapper">
    				<div id="admin-controls">
    					<Link to={`/${ this.props.params.programslug }/${ this.props.params.postid }/edit`}>Rediger</Link>
    				</div>
    				<RenderedPost blocks={ JSON.parse(this.state.post.body) } />
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