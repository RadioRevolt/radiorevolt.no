var React = require('react');
var ReactRouter = require('react-router');

var App = require('./App.js');
var Frontpage = require('components/Frontpage.js');
var About = require('components/About.js');
var ProgramList = require('components/ProgramList.js');
var Program = require('components/Program.js');
var ProgramFrontpage = require('components/ProgramFrontpage.js');
var IndependentArticle = require('components/IndependentArticle.js');
var Article = require('components/Article.js');

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
				<Route path="programmer" component={ ProgramList } />
				<Route path="article" component={ IndependentArticle } >
					<Route path=":articleid" component={ Article } />
				</Route>
				<Route path=":programslug" component={ Program } >
					<IndexRoute component={ ProgramFrontpage } />
					<Route path=":articleid" component={ Article } />
				</Route>
			</Route>
		</Router>
	), document.getElementById("global-wrapper"));
