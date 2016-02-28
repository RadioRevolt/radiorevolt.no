var flux = require('flux-react');
var actions = require('./actions');

var PostDAO = require('./dao/PostDAO')();

var PostStore = flux.createStore({
    posts: [],
    actions: [
        actions.addPost
    ],
    addPost: function (post) {
        this.posts.push(post);
        this.emitChange();
    },
    exports: {
        getPosts: function () {
            return this.posts;
        }
    }
});

module.exports = PostStore;