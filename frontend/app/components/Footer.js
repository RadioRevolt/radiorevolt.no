var React = require('react');
var PostStore = require('../PostStore');
var actions = require('../actions');

import {loggedIn, logOut, userName} from '../utils/auth';

var Footer = React.createClass({
    render: function() {
        var bottomBlock = null;
        if (loggedIn()) {
            bottomBlock = (<div id="footer-logged-in" className="row">
                            <div id="footer-logged-in-left" className="col-md-10">Du er logget inn som <span className="logged-in-as-username">{ userName() }</span>.</div>
                            <div id="footer-logged-in-right" className="col-md-2"><a href="/logout" onClick={logOut}>Logg ut</a></div>
                        </div>);
        }
        return (
            <div id="footer-wrapper" className="col-md-12">
                <div id="footer-main" className="row">
                	<div id="footer-left" className="col-md-8">
                		<img src="img/logo_black.png" id="footer-logo" /><br/>
                        Denne tjenesten tilbys av <a href="http://dusken.no/">Studentmediene i Trondheim AS</a>. Musikken er gjengitt med tilatelse fra TONO/NCB. Uautorisert lenking, videreføring eller kopiering er ulovlig.
                	</div>
                	<div id="footer-right" className="col-md-4 pull-right">
                		<h3>Har du et tips?</h3>
                		<ul>
                			<li>tips@radiorevolt.no</li>
                			<li>@radiorevolt</li>
                		</ul>
                		<h3>Annonsere hos oss?</h3>
                		<p>Kontakt <a href="mailto:salgssjef@studentmediene.no">salgssjef@studentmediene.no.</a></p>
                	</div>
                </div>
                { bottomBlock }
            </div>
           );
    }
});

module.exports = Footer;