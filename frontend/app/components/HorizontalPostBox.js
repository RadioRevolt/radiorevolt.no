var React = require('react');
var classNames = require('classnames');
var PostStore = require('../PostStore');
var actions = require('../actions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var HorizontalPostBox = React.createClass({
    render: function() {
        var extraClass = this.props.extraClass;
        var wrapperDivClasses = classNames('horizontal-post-box-wrapper', extraClass);

        let post_id = this.props.post_id;

        return (
            <div className={ wrapperDivClasses }>
                <div className="row">
                    <Link to={`/${ this.props.programSlug }/${ this.props.id }`}><img src="img/example.jpg" className="horizontal-post-box-image col-md-4"/></Link>
                    <div className="col-md-8">
                        <h2><Link to={`/${ this.props.programSlug }/${ this.props.id }`}>{ this.props.title }</Link></h2>
                        <p>{ this.props.body }</p>
                    </div>
                </div>
            </div>
           );
    }
});

module.exports = HorizontalPostBox;