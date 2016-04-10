var React = require('react');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var SmallLivePlayer = require('./SmallLivePlayer');

var ProgramSidebar = React.createClass({
    render: function() {
        let programInfoBlurb = null;
        if (Object.keys(this.props.programDetails).length !== 0) {
            programInfoBlurb = (
                <div id="program-info-blurb">
                    Dette er en placeholder-infotekst om programmet { this.props.programDetails.program.name }.
                </div>
            )
        }
        return (
            <div id="program-sidebar-wrapper">
                <SmallLivePlayer />
                { programInfoBlurb }
            </div>
           );
    }
});

var Program = React.createClass({
    getInitialState: function() {
        return {
            programDetails: ProgramStore.getProgramDetailsBySlug(this.props.params.programslug)
        };
    },
    componentWillMount: function() {
        ProgramStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        ProgramStore.removeChangeListener(this.changeState);
    },
    componentWillReceiveProps: function(nextProps) {
        this.changeState(nextProps.params.programslug);
    },
    changeState: function(slug) {
        if (slug == undefined) {
            slug = this.props.params.programslug;
        }

        this.setState({
            programDetails: ProgramStore.getProgramDetailsBySlug(slug)
        });
    },
    render: function() {
        return (
            <div id="program-wrapper">
                <div id="content-block-body" className="col-md-8">
                    { this.props.children }
                </div>
                <div id="content-block-sidebar" className="col-md-4">
                    { this.props.params.programslug }
                    <ProgramSidebar programDetails={ this.state.programDetails } />
                </div>
            </div>
           );
    }
});

module.exports = Program;