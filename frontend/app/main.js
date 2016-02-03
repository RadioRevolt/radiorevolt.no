var React = require('react');
var ReactRouter = require('react-router');

var App = require('./App.js');
var Frontpage = require('components/Frontpage.js');
var About = require('components/About.js');
var Program = require('components/Program.js');
var ProgramFrontpage = require('components/ProgramFrontpage.js');
var Post = require('components/Post.js');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;

React.render((
		<Router history={ hashHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Frontpage } />
				<Route path="om" component={ About } />
				<Route path=":program" component={ Program } >
					<IndexRoute component={ ProgramFrontpage } />
					<Route path=":postid" component={ Post } />
				</Route>
			</Route>
		</Router>
	), document.getElementById("global-wrapper"));
