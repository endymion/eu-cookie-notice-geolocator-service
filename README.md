# EU cookie notice geolocator service

If you need to display a cookie notice only to visitors to your web site from the European Union, then you could do the per-user location test on the server side or the client side.  You might want to do it from the browser side.

There are lots of possible reasons.  Maybe you're publishing your site as pre-generated static assets and you don't want to depend on a dynamic back end.  Maybe you're publishing a single-page app that will handle the cookie notice logic on the client side.

If you need to decide on the browser side whether to display an EU cookie notice, then your client-side code could pass the browser's IP to a geolocation service and then check the country code in the results against a list in your browser code.  Problem: Those IP geolocation services can be expensive if you have a lot of traffic.

Why not set up your own HTTP microservice that simply gives you the answer?  Instead of giving you a country, it simply says, "Yes, display the notice", or "No, don't display the notice."

That's what this project is.

## Details

This HTTP microservice uses AWS Lambda and AWS API Gateway, using the Serverless Framework.  AWS API Gateway services run through CloudFront by default.  CloudFront provides an HTTP header on each request called ```CloudFront-Viewer-Country``` with an [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code identifing the location of the requestor.

The handler function checks that code and compares it against a list of EU countries.  It responds with a JSON hash that includes the ```country``` value and the final decision: the ```in_EU``` value will be true or false.

    {
      'country': 'US',
      'in_EU': false
    }

## Running tests

The tests use Mocha, and are located in the ```tests/``` folder.

    npm test

## Offline operation

Install dependencies with:

    npm install

Start local HTTP server with:

    sls offline start

Then call the service at http://localhost:3000/locate

## Cloud operation

### Credentials

One way is to have an [AWS profile set up](https://serverless.com/framework/docs/providers/aws/guide/credentials/) in ```~/.aws/credentials``` that looks like this:

    [eu-cookie-notice-geolocator-service]
    aws_access_key_id = YOURACCESSKEYID
    aws_secret_access_key = YOURSECRETACCESSKEY

There are other ways to handle credentials, including environment variables.  Use whatever makes sense for your development or continuous delivery system or whatever.

### Development stage deployment

To deploy to the dev stage using the profile method of handling credentials, use ```sls deploy``` with that profile:

    sls deploy --aws-profile eu-cookie-notice-geolocator-service

## Usage

In a web site, you might have a cookie notice that's hidden by default:

    <div id="cookies" style="display: none">
      <b>WE USE COOKIES</b>
    </div>

You can selectively show that notice with jQuery code like this:

    var url = "https://[YOUR DEPLOYMENT ID].execute-api.us-east-1.amazonaws.com/dev/locate";
    $.getJSON(url, function (response) {
      if(response.in_EU) {
        $( "#cookies" ).show();
      }
    });

This code will check the service and display the notice if the response JSON includes ```in_EU: true```.

## Docker
If you use Docker you can quickly get things up and running locally by running ```docker-compose up```

This will boot a ```node``` container, install all necessary dependencies and make the app available at ```localhost:3000/locate```

### Running tests with Docker
You can run tests on the container by running ```docker-compose run app npm test```

Alternatively you can run the tests on container start by running ```docker-compose -f docker-compose-test.yml up```.
