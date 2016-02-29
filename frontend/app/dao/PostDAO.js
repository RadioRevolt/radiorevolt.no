var qs = require('qs');

var PostDAO = function () {
	this.handleError = function () {
		console.log('An error occurred.');
	};

	this.getPostsForProgram = function (programID, page, callback) {
		var queryString = qs.stringify({
			programID: programID,
			page: page
		});

		fetch('/api/post/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getBroadcastsForProgram = function (callback) {
		var queryString = qs.stringify({
			programID: programID,
			page: page,
			type: 'broadcast'
		});

		fetch('/api/post/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getRecentPosts = function (n, callback) {
		var queryString = qs.stringify({
			page: page,
			limit: n
		});

		fetch('/api/post/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getRecentBroadcasts = function(n, callback) {
		var queryString = qs.stringify({
			page: page,
			limit: n
		});

		fetch('/api/post/?' + queryString, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	};

	this.getPostDetails = function(postID, callback) {
		fetch(`/api/post/${postID}/`, {
			method: 'get'
		}).then(callback).catch(function(err) {
			this.handleError();
		});
	}
};

module.exports = PostDAO;