var React = require('react');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var FrontpageSidebar = require('./FrontpageSidebar');

var ProgramList = React.createClass({
    getInitialState: function() {
        return {
            programs: ProgramStore.getPrograms()
        };
    },
    componentWillMount: function() {
        ProgramStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        ProgramStore.removeChangeListener(this.changeState);
    },
    changeState: function() {
        this.setState({
            programs: ProgramStore.getPrograms()
        });
    },
    renderProgram: function(program) {
        return (
            <li>{ program.name }</li>
        );
    },
    render: function() {
        let programs = this.state.programs.map(this.renderProgram);

        return (
            <div id="frontpage-wrapper">
            	<div id="content-block-body" className="col-md-8">
            		<ul>{ programs }</ul>
            	</div>
            	<div id="content-block-sidebar" className="col-md-4">
            		<FrontpageSidebar />
            	</div>
            </div>
           );
    }
});

module.exports = ProgramList;