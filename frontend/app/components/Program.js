var React = require('react');
var PostStore = require('PostStore');
var actions = require('actions');

var ProgramSidebar = React.createClass({
    render: function() {
        return (
            <div id="program-sidebar-wrapper">
            </div>
           );
    }
});

var Program = React.createClass({
    render: function() {
        return (
            <div id="program-wrapper">
                <p>Program</p>
                { this.props.children }
            </div>
           );
    }
});

module.exports = Program;