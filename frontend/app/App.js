var React = require('react');
var PostStore = require('./PostStore');
var actions = require('./actions');

var Header = require('./components/Header');
var Footer = require('./components/Footer');

var App = React.createClass({
    getInitialState: function () {
        return {
            newPosts: ''
        };
    },
    componentWillMount: function () {
        PostStore.addChangeListener(this.changeState);
    },
    componentWillUnmount: function () {
        PostStore.removeChangeListener(this.changeState);
    },
    changeState: function () {
        this.setState({
            //messages: PostStore.getPosts()
        });
    },
    /*addPost: function (event) {
        event.preventDefault();
        var input = this.refs.newPost.getDOMNode();
        actions.addPost(input.value);
        this.setState({
            newPost: ''
        });
    },
    updateNewPost: function (event) {
        this.setState({
            newPost: event.target.value
        });
    },*/
    renderMessages: function (message) {
        return (
            <div>{post}</div>
           );
    },
    render: function() {
        var self = this;
        return (
            <div id="app-wrapper">
                <div id="header-content-wrapper" className="container">
                    <div id="header-block" className="row">
                        <Header />
                    </div>
                    <div id="content-block" className="row">
                        { self.props.children }
                    </div>
                </div>
                <div id="footer-wrapper">
                    <div className="container">
                        <div id="footer-block">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
           );
    }

});

module.exports = App;
