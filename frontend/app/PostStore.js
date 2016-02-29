var flux = require('flux-react');
var actions = require('./actions');

var PostDAO = require('./dao/PostDAO');
var ProgramDAO = require('./dao/ProgramDAO');

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
        this.posts.push(post);
        this.emitChange();
    },
    exports: {
        getPostDetails: function(postID) {
            let cacheValue = this.postDetails[postID];
            if (cacheValue != undefined) {
                return cacheValue;
            }

            ProgramDAO.getPostDetails(postID, function () {
                // Legg inn i cache
                this.emitChange();
            });

            return undefined;
        },
        getPostsForProgram: function (programID, page) {
            let cacheValue = this.postsForProgram[programID];
            if (cacheValue != undefined) {
                if (cacheValue[page] != undefined) {
                    return cacheValue[page];
                }
            }

            ProgramDAO.getPostsForProgram(programID, page, function () {
                // Legg inn i cache
                this.emitChange();
            });

            return undefined;
        },
        getBroadcastsForProgram: function (programID, page) {
            let cacheValue = this.broadcastsForProgram[programID];
            if (cacheValue != undefined) {
                if (cacheValue[page] != undefined) {
                    return cacheValue[page];
                }
            }

            ProgramDAO.getBroadcastsForProgram(programID, page, function () {
                // Legg inn i cache
                this.emitChange();
            });

            return undefined;
        },
        getRecentPosts: function(n) {
            if (this.recentPosts.length != 0) {
                return this.recentPosts;
            }

            ProgramDAO.getRecentPosts(n, function () {
                // Legg inn i cache
                this.emitChange();
            });

            return undefined;
        },
        getRecentBroadcasts: function(n) {
            if (this.recentBroadcasts.length != 0) {
                return this.recentBroadcasts;
            }

            ProgramDAO.getRecentBroadcasts(n, function () {
                // Legg inn i cache
                this.emitChange();
            });

            return undefined;
        }
    }
});

module.exports = PostStore;