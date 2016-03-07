var React = require('react');
var markdown = require('markdown').markdown;
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedTextBlock = React.createClass({
    render: function() {
    	let markdownText = this.props.data.text;
    	let renderedHTML = markdown.toHTML(markdownText);

		return (
			<div className="rendered-block rendered-text-block-wrapper" dangerouslySetInnerHTML={{ __html: renderedHTML }} />
		)
    }
});

module.exports = RenderedTextBlock;