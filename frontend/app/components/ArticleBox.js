var React = require('react');
var classNames = require('classnames');
var Store = require('../Store');
var actions = require('../actions');

var ArticleBox = React.createClass({
    render: function() {
        var extraClass = this.props.extraClass;
        var wrapperDivClasses = classNames('article-box-wrapper', extraClass);
        return (
            <div className={ wrapperDivClasses }>
            	<h2>{ this.props.title }</h2>
                <p>{ this.props.body }</p>
            </div>
           );
    }
});

module.exports = ArticleBox;