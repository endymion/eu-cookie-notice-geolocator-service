const _ = require('underscore')

module.exports = class LocatorService {
  locate(country) {
    var countries = [
      // EU member countries
      'AT', 'BE', 'BG', 'CY', 'CZ', 'DE',
      'DK', 'EE', 'ES', 'FI', 'FR', 'EL',
      'GR', 'HU', 'HR', 'IE', 'IT', 'LT',
      'LU', 'LV', 'MT', 'NL', 'PL', 'PT',
      'RO', 'SE', 'SI', 'SK', 'UK', 'GB',
      // Candidate countries
      'AL', 'MK', 'ME', 'RS', 'TR', 'CH',
      'IS', 'LI', 'NO',
      // EFTA countries
      'CH', 'IS', 'LI', 'NO'
    ]

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify({
        country: country,
        in_EU: _.contains(countries, country)
      })
    };
  }
};
