var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var secrets = require('./secrets')
var models = require('./db/models');
var mocks = require('./mocks/jira');

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("we're in")
});


passport.use(new Strategy({
    clientID: secrets.FACEBOOK_APP_ID,
    clientSecret: secrets.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log(profile)
    return cb(null, profile);
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(serveStatic(__dirname + "/dist"));

app.get('/login/facebook', function (req, res) {
  res.send({fbId: 'ulixir'});
});

app.post('/login/findUser', function (req, res) {
  var fbId = req.body.fbId;
  var Organization = models.OrganizationModel;

  Organization.findOne(
    {
      fbId : fbId
    }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.get('/jira/tasks', function (req, res) {
  res.send(mocks.mockTasksFromAPI);
})

app.get('/jira/members', function (req, res) {
  res.send(mocks.mockMembersFromAPI);
})

// app.get('/login/facebook',
//   passport.authenticate('facebook')
// );
//
// app.get('/login/facebook/return',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

app.listen(8080);
