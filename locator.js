var LocatorService = require('./lib/locator-service.js')

module.exports.locate = (event, context, callback) => {
  const locatorService = new LocatorService();
  const response = locatorService.locate('US');
  callback(null, response);
};
