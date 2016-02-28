var ProgramDAO = function () {
	this.handleError = function() {
		console.log('An error occurred.')
	};

	this.getPrograms = function (callback) {
		fetch('/api/program/', {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getActivePrograms = function(callback) {
		var queryString = qs.stringify({
			type: 'active'
		});

		fetch('/api/program/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getArchivedPrograms = function(callback) {
		var queryString = qs.stringify({
			type: 'inactive'
		});

		fetch('/api/program/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getProgramDetails = function(program, callback) {
		fetch(`/api/program/${programID}/`, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	}
};

module.exports = ProgramDAO;