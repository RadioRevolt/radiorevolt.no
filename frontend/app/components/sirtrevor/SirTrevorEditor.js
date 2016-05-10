var React = require('react');
var SirTrevor = require('sir-trevor');
var actions = require('actions');

var ReactRouter = require('react-router');
var History = ReactRouter.History;

var SirTrevorEditor = React.createClass({
    mixins: [History],
    getInitialState: function() {
        return {
            sirTrevorInstance: null
        }
    },
    createSirTrevor: function() {
        SirTrevor.setDefaults({
            required: ["Heading", "Text"],
            uploadUrl: "/api/image"
        });

        var sirTrevorInstance = new SirTrevor.Editor({ el: this.refs.sirTrevorTextarea });
        this.setState({
            sirTrevorInstance: sirTrevorInstance
        });
        this.props.instanceSetter(sirTrevorInstance);
    },
    componentDidMount: function() {
        document.getElementById('sirTrevorInstance').value = JSON.stringify({data: this.props.blocks});
        this.createSirTrevor();
    },
    render: function() {
		return (
			<div id="sir-trevor-editor-wrapper">
				<form>
                    <textarea id='sirTrevorInstance' ref="sirTrevorTextarea"></textarea>
                </form>
            </div>
		)
    }
});

module.exports = SirTrevorEditor;