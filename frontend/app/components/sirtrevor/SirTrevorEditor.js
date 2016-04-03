var React = require('react');
var SirTrevor = require('sir-trevor');

var SirTrevorEditor = React.createClass({
    createSirTrevor: function() {
        new SirTrevor.Editor({ el: this.refs.sirTrevorTextarea });
    },
    componentDidMount: function() {
        this.createSirTrevor();
    },
    render: function() {
		return (
			<div id="sir-trevor-editor-wrapper">
				<form>
                    <textarea className='js-st-instance' ref="sirTrevorTextarea"></textarea>
                </form>
            </div>
		)
    }
});

module.exports = SirTrevorEditor;