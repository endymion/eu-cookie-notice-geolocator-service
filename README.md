# EU Cookie Notice Geolocator service

If you need to displa a cookie notice only to visitors to your web site from the European Union, then you could do the per-user location test on the server side or the client side.  Doing it from the client side is a good idea to shift the load outward from your servers to your visitors' web browsers.

If you need to decide on the browser side whether to display an EU cookie notice, then your client-side code could pass the browser's IP to a geolocation service and then check the country code in the results against a list in your browser code.  Problem: Those IP geolocation services can be expensive if you have a lot of traffic.

Why not set up your own HTTP microservice that simply gives you the answer?  Instead of giving you a country, it simply says, "Yes, display the notice", or "No, don't display the notice."

That's what this project is.

## Details

This HTTP microservice uses AWS Lambda and AWS API Gateway, using the Serverless Framework.  AWS API Gateway services run through CloudFront by default.  CloudFront provides an HTTP header on each request called ```CloudFront-Viewer-Country``` with an [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code identifing the location of the requestor.

The handler function checks that code and compares it against a list of EU countries.  It responds with a JSON hash that includes the ```country``` value and the final decision: the ```located-in-EU``` value will be true or false.

    {
      'country': 'US',
      'located-in-EU': false
    }

## Running tests

The tests use Mocha, and are located in the ```tests/``` folder.

    npm test

## Offline operation

Install dependencies with:

    npm install

Start local HTTP server with:

    sls offline start
