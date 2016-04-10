var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedTextBlock = require('./RenderedTextBlock');
var RenderedVideoBlock = require('./RenderedVideoBlock');
var RenderedHeadingBlock = require('./RenderedHeadingBlock');

var RenderedPost = React.createClass({
    render: function() {
        let blocks = this.props.blocks;

        let componentForBlock = {
            "text": RenderedTextBlock,
            "video": RenderedVideoBlock,
            "heading": RenderedHeadingBlock
        }

        let renderedBlocks = blocks.map((each) => {
            let Component = componentForBlock[each.type];
            return (
                <Component data={ each.data } />
            );
        });

		return (
			<div className="rendered-post-wrapper">
                { renderedBlocks }
            </div>
		)
    }
});

module.exports = RenderedPost;