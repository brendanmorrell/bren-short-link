import { Meteor, } from 'meteor/meteor';
import '../imports/api/users';
import { WebApp, } from 'meteor/webapp';

import { Links, } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next, ) => {
    const _id = req.url.slice(1);// starts now at the second character thus removing the '/'
    const link = Links.findOne({ _id, });

    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});


















// WebApp.connectHandlers.use((req, res, next, ) => {
//   console.log(req.url);
//   console.log(req.method);
//   console.log(req.headers);
//   console.log(req.query);

// Set HTTP status code
// res.statusCode = 404;
// Set HTTP headers
// res.setHeader('my-custom-header', 'Brendan was here');
// Set HTTP body
// res.write('<h1> this is my middleware at work </p>');
// End HTTP request
// res.end();


// Send to google.com-->

// res.statusCode = 302;
// res.end();
