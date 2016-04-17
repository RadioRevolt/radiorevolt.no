var App = require('./../app/App.js');
import {renderIntoDocument} from 'react-addons-test-utils';

describe("App", function() {

  it("should be wrapped with a div", function() {
    var app = renderIntoDocument(App());
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });

});
