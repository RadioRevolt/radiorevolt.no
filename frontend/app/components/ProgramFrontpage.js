var React = require('react');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var HorizontalPostBox = require('./HorizontalPostBox');
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
        var text = post.lead;
        text = text.replace('\n', '</p><p>')
        text = '<p>' + text + '</p>'
        var textElement = <span dangerouslySetInnerHTML={ { "__html": text } } />

        return (
            <HorizontalPostBox title={ post.title } body={ textElement } id={ post["_id"] } programSlug={ this.state.programDetails.program.slug } extraClass="col-md-12" />
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