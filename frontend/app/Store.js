var flux = require('flux-react');
var actions = require('./actions');

module.exports = flux.createStore({
    messages: [],
    actions: [
        actions.addMessage
    ],
    addMessage: function (message) {
        this.messages.push(message);
        this.emitChange();
    },
    exports: {
        getMessages: function () {
            return this.messages;
        }
    }
});
