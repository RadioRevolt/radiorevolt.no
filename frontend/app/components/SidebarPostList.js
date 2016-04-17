var React = require('react');
var actions = require('../actions');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var SidebarPostList = React.createClass({
    renderPost: function(post) {
        var programName = "";
        var slug = "";
        for (let program of this.props.programs) {
            if (program["_id"] == post.program) {
                programName = program.name;
                slug = program.slug;
                break;
            }
        }

        return (
            <li className="sidebar-post-list-element row"><div className="col-xs-12">
                <Link to={`/${ slug }/${ post["_id"] }`}><img className="post-image pull-left" src="img/example2.jpg" /></Link>
                <div className="post-program">{ programName }</div>
                <div className="post-title"><Link to={`/${ slug }/${ post["_id"] }`}>{ post.title }</Link></div>
                <div className="post-lead">{ post.lead }</div>
            </div></li>
        );
    },
    render: function() {
        if (this.props.posts === undefined || this.props.programs === undefined) {
            return <div id="popular-posts-wrapper"></div>;
        }
        var posts = this.props.posts.map(this.renderPost);
        return (
            <div id="popular-posts-wrapper">
            	<h3>{ this.props.title }</h3>
            	<ul className="sidebar-post-list">{ posts }</ul>
            </div>
           );
    }
});

module.exports = SidebarPostList;