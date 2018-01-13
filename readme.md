# Short Link

This is a link shortener built on Meteor and React

## Authors

Brendan Morrell

##heroku deployment instructions
after you create a new heroku repository (heroku create *desired name*)
you then get the buildpack set up for Meteor

heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git

then add your meteor node version into package.json (use 'meteor node -v' to find this)

after dependencies in package.json, add:

,
"engines": {
  "node": "8.9.3" *or whatever the version was*
}
