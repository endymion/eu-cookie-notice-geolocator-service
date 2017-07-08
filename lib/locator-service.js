 module.exports = class LocatorService {
    locate(country) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            country: country,
            'located-in-EU': false
          })
        };
      }
    }
