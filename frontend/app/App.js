var React = require('react');
var Store = require('./Store');
var actions = require('./actions');

var Header = require('./components/Header');
var Footer = require('./components/Footer');

var App = React.createClass({
    getInitialState: function () {
        return {
            messages: Store.getMessages(),
            newMessage: ''
        };
    },
    componentWillMount: function () {
        Store.addChangeListener(this.changeState);
    },
    componentWillUnmount: function () {
        Store.removeChangeListener(this.changeState);
    },
    changeState: function () {
        this.setState({
            messages: Store.getMessages()
        });
    },
    addMessage: function (event) {
        event.preventDefault();
        var input = this.refs.newMessage.getDOMNode();
        actions.addMessage(input.value);
        this.setState({
            newMessage: ''
        });
    },
    updateNewMessage: function (event) {
        this.setState({
            newMessage: event.target.value
        });
    },
    renderMessages: function (message) {
        return (
            <div>{message}</div>
           );
    },
    render: function() {
        var self = this;
        return (
            <div id="app-wrapper">
                <p>App.js</p>
                <div id="header-block">
                    <Header />
                </div>
                <div id="content-block">
                    { self.props.children }
                </div>
                <div id="footer">
                    <Footer />
                </div>
            </div>
           );
    }

});

module.exports = App;
