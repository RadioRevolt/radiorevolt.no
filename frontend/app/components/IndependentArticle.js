var React = require('react');
var PostStore = require('PostStore');
var actions = require('actions');

var IndependentArticle = React.createClass({
    render: function() {
        return (
            <div id="independent-article-wrapper">
                <p>IndependentArticle</p>
            </div>
           );
    }
});

module.exports = IndependentArticle;