var React = require('react');
var PostStore = require('PostStore');
var ProgramStore = require('ProgramStore');
var actions = require('actions');

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
    renderPost: function(post, width) {
        let programSlug = null;
        this.state.programs.forEach((each) => {
            if (each["_id"] == post.program) {
                programSlug = each.slug;
            }
        });

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
        let topPost = this.renderPost(this.state.posts[0], 12);
        let posts = this.state.posts.slice(1).map((post) => { return(this.renderPost(post, 6)); });

        return (
            <div id="frontpage-wrapper">
            	<div id="content-block-posts" className="col-md-8">
                    <div id="top-post" className="row">
                        { topPost }
                    </div>
                    <div id="post-two-times-two" className="row">
            		    { posts }
                    </div>
            	</div>
            	<div id="content-block-sidebar" className="col-md-4">
            		<FrontpageSidebar />
            	</div>
            </div>
           );
    }
});

module.exports = Frontpage;