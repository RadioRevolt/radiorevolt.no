var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

var PostMetaControls = React.createClass({
	getInitialState: function() {
        return {
            program: this.props.program || null,
            publicationDate: this.props.publicationDate || null,
            publicationTime: this.props.publicationTime || null,
            authorFromList: this.props.authorFromList || "",
            authorText: this.props.authorText || "",
            programs: ProgramStore.getPrograms() || []
        };
    },
    handleProgramChange: function(event) {
        let value = event.target.value;
        this.setState({ program: value });
    },
    handlePublicationDateChange: function(event) {
        let value = event.target.value;
        this.setState({ publicationDate: value });
    },
    handlePublicationTimeChange: function(event) {
        let value = event.target.value;
        this.setState({ publicationTime: value });
    },
    handleAuthorFromListChange: function(event) {
        let value = event.target.value;
        this.setState({ authorFromList: value });
    },
    handleAuthorTextChange: function(event) {
        let value = event.target.value;
        this.setState({ authorText: value });
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
    render: function() {
        if (this.state.programs.length == 0) {
            return (
                <div id="post-meta-controls-wrapper">
                </div>
                );
        }

        var sortedPrograms = this.state.programs.sort((a, b) => {
            return a.name > b.name;
        });

        var programOptions = sortedPrograms.map((program) => {
            return (<option value={ program.slug }>{ program.name }</option>);
        });
        programOptions.unshift(<option value={ null }></option>);

        var programDisabled = false;
        if (this.props.program !== undefined) {
            programDisabled = true;
        }

        var authors = [];
        authors.unshift(<option value={ null }></option>);

		return (
			<div id="post-meta-controls-wrapper">
                <div id="author-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputAuthorFromList">Forfatter</label>
                        <select className="form-control" onChange={this.handleAuthorFromListChange} value={ this.state.authorFromList } id="inputAuthorFromList">
                            { authors }
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputAuthorText">Forfatter (fritekst)</label>
                        <input className="form-control" onChange={this.handleAuthorTextChange} value={this.state.authorText} id="inputAuthorText" placeholder="Navn eller organisasjon" />
                    </div>
                </div>

                <div id="program-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputProgram">Program</label>
                        <select className="form-control" onChange={this.handleProgramChange} value={this.state.program} id="inputProgram" disabled={ programDisabled }>
                            { programOptions }
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label htmlFor="inputDate">Publiseringstidspunkt (tomme felt betyr nå)</label>
                        <div className="form-inline">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="inputDate">Publication date</label>
                                <input className="form-control" onChange={this.handlePublicationDateChange} value={this.state.publicationDate} id="inputDate" placeholder="YYYY-MM-DD" />
                            </div>
                            <div className="form-group pull-right">
                                <label className="sr-only" htmlFor="inputTime">Publication time</label>
                                <input className="form-control" onChange={this.handlePublicationTimeChange} value={this.state.publicationTime} id="inputTime" placeholder="HH:MM" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
});

module.exports = PostMetaControls;