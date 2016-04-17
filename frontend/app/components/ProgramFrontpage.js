var React = require('react');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostBox = require('./PostBox');
var RenderedPost = require('./sirtrevor/RenderedPost');

var ProgramFrontpage = React.createClass({
	getInitialState: function() {
        return {
            programDetails: ProgramStore.getProgramDetailsBySlug(this.props.params.programslug)
        };
    },
    componentWillMount: function() {
        ProgramStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        ProgramStore.removeChangeListener(this.changeState);
    },
    componentWillReceiveProps: function(nextProps) {
        this.changeState(nextProps.params.programslug);
    },
    changeState: function(slug) {
        if (slug == undefined) {
            slug = this.props.params.programslug;
        }

        this.setState({
            programDetails: ProgramStore.getProgramDetailsBySlug(slug)
        });
    },
    renderPost: function(post) {
        return (
            <PostBox title={ post.title } body={ post.lead } id={ post["_id"] } programSlug={ this.state.programDetails.program.slug } extraClass="col-md-12" />
        );
    },
    render: function() {
    	let posts = null;
    	if (Object.keys(this.state.programDetails).length !== 0) {
    		posts = this.state.programDetails.posts.map(this.renderPost);
            return (
	            <div id="program-frontpage-wrapper" className="row">
	                { posts }
	            </div>
        	);
        } else {
        	return (
        		<div id="program-frontpage-wrapper">
        		</div>
        	)
        }
    }
});

module.exports = ProgramFrontpage;