var React = require('react');
var Store = require('../Store');
var actions = require('../actions');

var Footer = React.createClass({
    render: function() {
        return (
            <div id="footer-wrapper">
            	<div id="footer-left" className="col-md-8">
            		Dusken.no og lignende
            	</div>
            	<div id="footer-right" className="col-md-4 pull-right">
            		Ikke Kris Monsen
            	</div>
            </div>
           );
    }
});

module.exports = Footer;