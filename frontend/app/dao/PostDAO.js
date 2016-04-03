var qs = require('qs');

var PostDAO = function () {
	let urlPrefix = 'http://localhost:3000';

	this.handleError = function (err) {
		console.log('An error occurred.');
		console.log(err);
	};

	this.addPost = function(postBody, callback) {
		fetch(urlPrefix + '/api/post/', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postBody)
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.updatePost = function(postID, postBody, callback) {
		fetch(urlPrefix + '/api/post/' + postID, {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postBody)
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	}

	this.getPostsForProgram = function (programID, page, callback) {
		var queryString = qs.stringify({
			programID: programID,
			page: page
		});

		fetch(urlPrefix + '/api/post/?' + queryString, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getBroadcastsForProgram = function (callback) {
		var queryString = qs.stringify({
			programID: programID,
			page: page,
			type: 'broadcast'
		});

		fetch(urlPrefix + '/api/post/?' + queryString, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getRecentPosts = function (n, callback) {
		var queryString = qs.stringify({
			limit: n
		});

		fetch(urlPrefix + '/api/post/?' + queryString, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getRecentBroadcasts = function(n, callback) {
		var queryString = qs.stringify({
			limit: n
		});

		fetch(urlPrefix + '/api/post/?' + queryString, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getPostDetails = function(postID, callback) {
		fetch(urlPrefix + `/api/post/${postID}/`, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	}
};

module.exports = PostDAO;