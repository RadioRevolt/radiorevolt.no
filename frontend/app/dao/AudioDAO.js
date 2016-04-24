var qs = require('qs');
var settings = require('../settings');

var AudioDAO = function () {
	let urlPrefix = settings.apiUrl;

	this.handleError = function(err) {
		console.log('An error occurred.')
		console.log(err);
	};

	this.getOnDemandForProgram = function (programId, callback) {
		fetch(urlPrefix + '/ondemand/' + programId, {
			method: 'get',
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getOnDemand = function(programId, onDemandId, callback) {
		fetch(urlPrefix + '/ondemand/' + programId + '/' + onDemandId, {
			method: 'get',
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getPodcastForProgram = function (programId, callback) {
		fetch(urlPrefix + '/podcast/' + programId, {
			method: 'get',
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getPodcast = function(programId, podcastId, callback) {
		fetch(urlPrefix + '/podcast/' + programId + '/' + podcastId, {
			method: 'get',
			credentials: 'same-origin'
		}).then((response) => {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};
};

module.exports = AudioDAO;