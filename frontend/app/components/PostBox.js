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

        var imageClasses = ["post-box-image", "col-md-12"];
        console.log(this.props.tall);
        if (this.props.tall == true) {
            imageClasses.push("tall");
        }
        var imageClassesText = imageClasses.join(" ");

        return (
            <div className={ wrapperDivClasses }>
                <div className="row post-box-image-container">
                    <Link to={`/${ this.props.programSlug }/${ this.props.id }`}><img src="img/example.jpg" className={ imageClassesText } /></Link>
                </div>
            	<h2><Link to={`/${ this.props.programSlug }/${ this.props.id }`}>{ this.props.title }</Link></h2>
                <p>{ this.props.body }</p>
            </div>
           );
    }
});

module.exports = PostBox;