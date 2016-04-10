var React = require('react');
var markdown = require('markdown').markdown;
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedTextBlock = React.createClass({
    render: function() {
    	let sirTrevorHTML = this.props.data.text;

		return (
			<div className="rendered-block rendered-text-block-wrapper" dangerouslySetInnerHTML={{ __html: sirTrevorHTML }} />
		)
    }
});

module.exports = RenderedTextBlock;