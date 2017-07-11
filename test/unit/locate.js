var chai = require('chai')
var expect = chai.expect

var LocatorService = require('../../lib/locator-service')

describe('LocatorService', function() {
  it('classifies Austria as inside of the EU', function() {
    const locatorService = new LocatorService();
    const country = 'AT'; // Austria is in the European Union.
    const response = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: '{"country":"AT","in_EU":true}'
    };

    return expect(locatorService.locate(country)).to.eql(response);
  });

  it('classifies the US as outside of the EU', function() {
    const locatorService = new LocatorService();
    const country = 'US'; // Austria is in the European Union.
    const response = {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: '{"country":"US","in_EU":false}'
    };

    return expect(locatorService.locate(country)).to.eql(response);
  });

});
