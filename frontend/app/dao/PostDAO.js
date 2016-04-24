var qs = require('qs');
var settings = require('../settings');

var PostDAO = function () {
	let urlPrefix = settings.apiUrl;

	this.handleError = function (err) {
		console.log('An error occurred.');
		console.log(err);
	};

	this.addPost = function(postBody, callback) {
		fetch(urlPrefix + '/post/', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify(postBody)
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.updatePost = function(postID, postBody, callback) {
		console.log("called updatePost with postID " + postID);
		fetch(urlPrefix + '/post/' + postID, {
			method: 'put',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify(postBody)
		}).then(function(response) {
			console.log(response);
			response.json().then(callback);
		}).catch((err) => {
			console.log("error");
			this.handleError(err);
		});
	}

	this.getPostsForProgram = function (programID, page, callback) {
		var queryString = qs.stringify({
			programID: programID,
			page: page
		});

		fetch(urlPrefix + '/post/?' + queryString, {
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

		fetch(urlPrefix + '/post/?' + queryString, {
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

		fetch(urlPrefix + '/post/?' + queryString, {
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

		fetch(urlPrefix + '/post/?' + queryString, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	};

	this.getPostDetails = function(postID, callback) {
		fetch(urlPrefix + `/post/${postID}/`, {
			method: 'get'
		}).then(function(response) {
			response.json().then(callback);
		}).catch((err) => {
			this.handleError(err);
		});
	}
};

module.exports = PostDAO;