var React = require('react');
var markdown = require('markdown').markdown;
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var RenderedVideoBlock = React.createClass({
    render: function() {
        let source = this.props.data.source;
        let remote_id = this.props.data.remote_id;

        console.log(source);

        if (source === 'youtube' && remote_id !== undefined) {
            let src = `http://www.youtube.com/embed/${ remote_id }`;
            let player = (
                <iframe className='youtube-block-iframe' id='ytplayer' type='text/html' src={ src } />
            );
            return (
                <div className="rendered-block rendered-video-block-wrapper">
                    { player }
                </div>
            )
        } else {
    		return (
    			<div className="rendered-block rendered-video-block-wrapper">
    				The source for this video block is not yet supported.
                </div>
    		)
        }
    }
});

module.exports = RenderedVideoBlock;