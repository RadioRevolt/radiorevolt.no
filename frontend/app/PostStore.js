var flux = require('flux-react');
var actions = require('./actions');

var PostDAO = require('./dao/PostDAO.js');

var PostStore = flux.createStore({
    postsForProgram: {},
    broadcastsForProgram: {},
    postDetails: {},
    recentPosts: [],
    recentPostsCount: 0,
    recentBroadcasts: [],
    recentBroadcastsCount: 0,
    actions: [
        actions.addPost,
        actions.updatePost
    ],
    addPost: function (postBody) {
        var dao = new PostDAO();
        dao.addPost(postBody, (data) => {
            this.emitChange();
        });
    },
    updatePost: function(postID, postBody) {
        var dao = new PostDAO();
        dao.updatePost(postID, postBody, (data) => {
            this.emitChange();
        });
    },
    exports: {
        getPostDetails: function(postID) {
            let cacheValue = this.postDetails[postID];
            if (cacheValue != undefined) {
                return cacheValue;
            }

            var dao = new PostDAO();
            dao.getPostDetails(postID, (data) => {
                this.postDetails[postID] = data;
                this.emitChange();
            });

            return {};
        },
        getPostsForProgram: function (programID, page) {
            let cacheValue = this.postsForProgram[programID];
            if (cacheValue != undefined) {
                if (cacheValue[page] != undefined) {
                    return cacheValue[page];
                }
            }

            var dao = new PostDAO();
            dao.getPostsForProgram(programID, page, (data) => {
                if (cacheValue == undefined) {
                    this.postsForProgram[programID] = [];
                }
                this.postsForProgram[programID][page] = data;
                this.emitChange();
            });

            return [];
        },
        getBroadcastsForProgram: function (programID, page) {
            let cacheValue = this.broadcastsForProgram[programID];
            if (cacheValue != undefined) {
                if (cacheValue[page] != undefined) {
                    return cacheValue[page];
                }
            }

            var dao = new PostDAO();
            dao.getBroadcastsForProgram(programID, page, (data) => {
                if (cacheValue == undefined) {
                    this.broadcastsForProgram[programID] = [];
                }
                this.broadcastsForProgram[programID][page] = data;
                this.emitChange();
            });

            return [];
        },
        getRecentPosts: function(n) {
            if (this.recentPostsCount >= n) {
                return this.recentPosts.slice(0, n);
            }

            var dao = new PostDAO();
            dao.getRecentPosts(n, (data) => {
                this.recentPosts = data;
                this.recentPostsCount = n;

                this.emitChange();
            });

            return [];
        },
        getRecentBroadcasts: function(n) {
            if (this.recentBroadcastsCount >= n) {
                return this.recentBroadcasts.slice(0, n);
            }

            var dao = new PostDAO();
            dao.getRecentBroadcasts(n, (data) => {
                this.recentBroadcasts = data;
                this.recentBroadcastsCount = n;

                this.emitChange();
            });

            return [];
        }
    }
});

module.exports = PostStore;