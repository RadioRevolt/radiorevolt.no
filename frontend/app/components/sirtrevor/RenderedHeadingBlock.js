var React = require('react');
var markdown = require('markdown').markdown;
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedHeadingBlock = React.createClass({
    render: function() {
    	let sirTrevorHTML = "<h1>" + this.props.data.text + "</h1>";

		return (
			<div className="rendered-block rendered-heading-block-wrapper" dangerouslySetInnerHTML={{ __html: sirTrevorHTML }} />
		)
    }
});

module.exports = RenderedHeadingBlock;