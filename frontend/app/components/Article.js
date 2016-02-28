var React = require('react');
var Store = require('Store');
var actions = require('actions');

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