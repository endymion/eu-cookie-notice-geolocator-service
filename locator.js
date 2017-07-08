var LocatorService = require('./lib/locator-service.js')

module.exports.locate = (event, context, callback) => {
  const headers = event.headers;
  var country = headers['CloudFront-Viewer-Country'];
  const locatorService = new LocatorService();
  callback(null, locatorService.locate(country));
};
