var React = require('react');
import {render} from 'react';
var ReactRouter = require('react-router');

var App = require('./App.js');
var Frontpage = require('components/Frontpage.js');
var About = require('components/About.js');
var ProgramList = require('components/ProgramList.js');
var Program = require('components/Program.js');
var ProgramFrontpage = require('components/ProgramFrontpage.js');
var IndependentPost = require('components/IndependentPost.js');
var Post = require('components/Post.js');
var PostEditor = require('components/PostEditor.js');
var PostCreator = require('components/PostCreator.js');
import Login from 'components/Login';


var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;

//Fix for authenticating on image upload
var oldFetch = window.fetch;

window.fetch = function(input, init) {
  if (!('credentials' in init)) {
    init['credentials'] = 'same-origin';
  }
  return oldFetch(input, init);
};

render((
		<Router history={ hashHistory }>
			<Route path="/" component={ App }>
				<IndexRoute component={ Frontpage } />
				<Route path="login" component={ Login } />
				<Route path="om" component={ About } />
				<Route path="programmer" component={ ProgramList } />
				<Route path="post" component={ IndependentPost } >
					<Route path=":postid" component={ Post } />
				</Route>
				<Route path=":programslug" component={ Program } >
					<IndexRoute component={ ProgramFrontpage } />
					<Route path="new" component={ PostCreator } />
					<Route path=":postid">
						<IndexRoute component={ Post } />
						<Route path="edit" component={ PostEditor } />
					</Route>
				</Route>
			</Route>
		</Router>
	), document.getElementById("global-wrapper"));
