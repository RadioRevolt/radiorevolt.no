var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var Footer = React.createClass({
    render: function() {
        return (
            <div id="footer-wrapper">
            	<div id="footer-left" className="col-md-8">
            		<img src="img/logo_black.png" id="header-logo" />
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
           );
    }
});

module.exports = Footer;