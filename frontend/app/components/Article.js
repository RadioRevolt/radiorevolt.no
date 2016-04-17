var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var Post = React.createClass({
    render: function() {
        return (
            <div id="post-wrapper">
                <p>Post</p>
            </div>
           );
    }
});

module.exports = Post;