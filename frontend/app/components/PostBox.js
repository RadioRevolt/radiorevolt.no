var React = require('react');
var classNames = require('classnames');
var PostStore = require('../PostStore');
var actions = require('../actions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var PostBox = React.createClass({
    render: function() {
        var extraClass = this.props.extraClass;
        var wrapperDivClasses = classNames('post-box-wrapper', extraClass);

        let post_id = this.props.post_id;

        return (
            <div className={ wrapperDivClasses }>
                <div className="row">
                    <img className="post-box-image col-md-12"/>
                </div>
            	<h2><Link to={`/${ this.props.programSlug }/${ this.props.id }`}>{ this.props.title }</Link></h2>
                <p>{ this.props.body }</p>
            </div>
           );
    }
});

module.exports = PostBox;