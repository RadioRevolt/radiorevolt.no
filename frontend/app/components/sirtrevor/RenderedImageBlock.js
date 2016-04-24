var React = require('react');
var markdown = require('markdown').markdown;
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedTextBlock = React.createClass({
    render: function() {
    	var imageUrl = null;
    	if (this.props.data.file !== undefined && this.props.data.file.url !== undefined) {
    		imageUrl = this.props.data.file.url;
    	}

    	let sirTrevorHTML = <img src={ imageUrl } className="col-xs-12 post-image" />;

		return (
			<div className="rendered-block rendered-image-block-wrapper row">
				{ sirTrevorHTML }
			</div>
		)
    }
});

module.exports = RenderedTextBlock;

