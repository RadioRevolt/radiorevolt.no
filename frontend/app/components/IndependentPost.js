var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var IndependentPost = React.createClass({
    render: function() {
        return (
            <div id="independent-post-wrapper">
                <p>IndependentPost</p>
            </div>
           );
    }
});

module.exports = IndependentPost;