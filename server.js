var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var session = require('express-session');

var secrets = require('./secrets')
var Organization = require('./db/models/organization');
var mocks = require('./mocks/jira');

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to Mongo");
});

var app = express();
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(__dirname + "/dist"));

app.post('/signUp', function (req, res) {
  if (
    req.body.companyName &&
    req.body.email &&
    req.body.password
  ) {
    var organization = new Organization({
      name: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      repFirstName: req.body.firstName,
      repLastName: req.body.lastName,
      ethBalance: 0,
      ethAddress: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
      workers: [],
      tasks: []
    });
    organization.save()
      .then(function(_org) {
        res.send(_org);
        return;
      })
      .catch(function(err) {
        console.log(err)
        res.send({
          error: true,
          message: 'Sorry, there was error saving your information. Try again later!',
          status: 400
        });
      })
  } else {
    res.send({
      error: true,
      message: 'All fields are required',
      status: 400
    });
  }
})

app.post('/login', function (req, res) {
  if (req.body.email && req.body.password) {
    Organization.authenticate(req.body.email, req.body.password, function (error, org) {
      if (error || !org) {
        res.send({
          error: true,
          status: 401,
          message: 'Sorry! You\'ve got the wrong email or password.'
        });
      } else {
        req.session.userId = org._id;
        return res.send(org);
      }
    });
  } else {
    res.send({
      error: true,
      status: 400,
      message: 'All fields are required.'
    });
  }
})

app.get('/jira/tasks', function (req, res) {
  res.send(mocks.mockTasksFromAPI);
});

app.get('/jira/workers', function (req, res) {
  res.send(mocks.mockWorkersFromAPI);
});

app.post('/jira/workers/update', function (req, res) {
  var password = req.body.password;
  var workers = req.body.workers;

  return Organization.update(
    { "password" : password },
    { $set : {"workers" : workers} }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.post('/jira/tasks/update', function (req, res) {
  var password = req.body.password;
  var tasks = req.body.tasks;

  return Organization.update(
    { "password" : password },
    { $set : {"tasks" : tasks} }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.listen(8080);
