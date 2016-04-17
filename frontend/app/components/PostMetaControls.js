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
            authorText: this.props.authorText || ""
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
    render: function() {
		return (
			<div id="post-meta-controls-wrapper">
                <div id="author-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorFromList">Forfatter</label>
                        <select className="form-control" onChange={this.handleAuthorFromListChange} id="inputAuthorFromList">
                            <option>1</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label for="inputAuthorText">Forfatter (fritekst)</label>
                        <input className="form-control" onChange={this.handleAuthorTextChange} id="inputAuthorText" placeholder="Navn eller organisasjon" />
                    </div>
                </div>

                <div id="program-controls" className="row">
                    <div className="col-md-6 form-group">
                        <label for="inputProgram">Program</label>
                        <select className="form-control" onChange={this.handleProgramChange} id="inputProgram">
                            <option>Garasjen</option>
                            <option>Reservebenken</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label for="inputDate">Publiseringstidspunkt (tomme felt betyr nå)</label>
                        <div className="form-inline">
                            <div className="form-group">
                                <label className="sr-only" for="inputDate">Publication date</label>
                                <input className="form-control" onChange={this.handlePublicationDateChange} id="inputDate" placeholder="YYYY-MM-DD" />
                            </div>
                            <div className="form-group pull-right">
                                <label className="sr-only" for="inputTime">Publication time</label>
                                <input className="form-control" onChange={this.handlePublicationTimeChange} id="inputTime" placeholder="HH:MM" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
});

module.exports = PostMetaControls;