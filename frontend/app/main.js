var React = require('react');
var ReactRouter = require('react-router');

var App = require('App.js');
var Frontpage = require('components/Frontpage.js');
var Program = require('components/Program.js');
var Post = require('components/Post.js');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;

React.render((
		<Router history={ hashHistory }>
			<Route path="/" component={ App }>
			</Route>
		</Router>
	), document.body);
