var flux = require('flux-react');
var actions = require('./actions');

var PostDAO = require('./dao/PostDAO.js');

var PostStore = flux.createStore({
    postsForProgram: {},
    broadcastsForProgram: {},
    postDetails: {},
    recentPosts: [],
    recentBroadcasts: [],
    actions: [
        actions.addPost
    ],
    addPost: function (post) {
        // Logic for adding post
        // Update backend and cache
        this.emitChange();
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
            if (this.recentPosts.length != 0) {
                return this.recentPosts;
            }

            var dao = new PostDAO();
            dao.getRecentPosts(n, (data) => {
                this.recentPosts = data;
                this.emitChange();
            });

            return [];
        },
        getRecentBroadcasts: function(n) {
            if (this.recentBroadcasts.length != 0) {
                return this.recentBroadcasts;
            }

            var dao = new PostDAO();
            dao.getRecentBroadcasts(n, (data) => {
                this.recentBroadcasts = data;
                this.emitChange();
            });

            return [];
        }
    }
});

module.exports = PostStore;