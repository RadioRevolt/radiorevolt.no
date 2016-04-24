var React = require('react');
var PostStore = require('../PostStore');
var ProgramStore = require('../ProgramStore');
var actions = require('../actions');

var FrontpageSidebar = require('./FrontpageSidebar');
var LargeLivePlayer = require('./LargeLivePlayer');
var LatestEpisodes = require('./LatestEpisodes');
var PostBox = require('./PostBox');

var Frontpage = React.createClass({
    getInitialState: function() {
        return {
            posts: PostStore.getRecentPosts(7),
            programs: ProgramStore.getPrograms()
        };
    },
    componentWillMount: function() {
        PostStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function() {
        PostStore.removeChangeListener(this.changeState);
    },
    changeState: function() {
        this.setState({
            posts: PostStore.getRecentPosts(6),
            programs: ProgramStore.getPrograms()
        });
    },
    renderTopPost: function(post) {
        var programSlug = this.getSlugForId(post.program);
        return (
            <PostBox title={ post.title } body={ post.lead } programSlug={ programSlug } id={ post["_id"] } extraClass="col-md-12" tall={ true } />
        );
    },
    getSlugForId: function(id) {
        this.state.programs.forEach((each) => {
            if (each["_id"] == id) {
                return each.slug;
            }
        });
    },
    renderPost: function(post, width) {
        var programSlug = this.getSlugForId(post.program);
        var extraClass = "col-md-" + width;

        return (
            <PostBox title={ post.title } body={ post.lead } programSlug={ programSlug } id={ post["_id"] } extraClass={ extraClass } />
        );
    },
    render: function() {
        if (this.state.posts.length == 0 || this.state.programs.length == 0) {
            return (
                <div id="frontpage-wrapper">
                </div>
            )
        }
        let topPost = this.renderTopPost(this.state.posts[0]);
        let posts = this.state.posts.slice(1).map((post) => { return(this.renderPost(post, 6)); });

        return (
            <div id="frontpage-wrapper">
            	<div id="content-block-posts" className="col-md-12">
                    <div id="top-post" className="row">
                        { topPost }
                    </div>
                    <div id="post-two-times-two" className="row">
            		    { posts }
                    </div>
            	</div>
            </div>
           );
    }
});

module.exports = Frontpage;