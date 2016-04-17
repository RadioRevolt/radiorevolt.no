var qs = require('qs');
var settings = require('../settings');

var ProgramDAO = function () {
	let urlPrefix = settings.apiUrl;

	this.handleError = function(err) {
		console.log('An error occurred.')
		console.log(err);
	};

	this.getPrograms = function (callback) {
		fetch(urlPrefix + '/program/', {
			method: 'get'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getActivePrograms = function(callback) {
		var queryString = qs.stringify({
			type: 'active'
		});

		fetch(urlPrefix + '/program/?' + queryString, {
			method: 'get'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getArchivedPrograms = function(callback) {
		var queryString = qs.stringify({
			type: 'inactive'
		});

		fetch(urlPrefix + '/program/?' + queryString, {
			method: 'get'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getProgramDetails = function(id, callback) {
		fetch(urlPrefix + `/program/${id}/`, {
			method: 'get'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	}
};

module.exports = ProgramDAO;