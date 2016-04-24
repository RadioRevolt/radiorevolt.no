var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

var HeaderLogo = require('./HeaderLogo');
var HeaderMenu = require('./HeaderMenu');
var SmallLivePlayer = require('./SmallLivePlayer');

var Header = React.createClass({
    render: function() {
        return (
            <div id="header-wrapper">
            	<div id="header-left" className="col-md-4">
                    <SmallLivePlayer />
            	</div>
                <div id="header-center" className="col-md-4">
                    <HeaderMenu />
                </div>
                <div id="header-right" className="col-md-2">
                    <HeaderLogo />
                </div>
            </div>
           );
    }
});

module.exports = Header;