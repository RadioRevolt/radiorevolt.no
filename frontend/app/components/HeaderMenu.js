var React = require('react');
var ReactRouter = require('react-router');
var PostStore = require('../PostStore');
var actions = require('../actions');
import {loggedIn, logOut} from '../utils/auth';

var Link = ReactRouter.Link;

var HeaderMenu = React.createClass({
    render() {
        var authLink = null;
        if (loggedIn()) {
            authLink = <a href="/logout" onClick={logOut}>Logg ut</a>;
        }

        return (
            <div id="header-menu-wrapper">
                <ul id="header-menu">
                    <li><Link to={'/programmer/'}>PROGRAMMER</Link></li>
                    <li><Link to={'/om/'}>OM OSS</Link></li>
                    <li>{authLink}</li>
                </ul>
            </div>
        );
    }
});

module.exports = HeaderMenu;