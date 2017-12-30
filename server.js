var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var session = require('express-session');
var axios = require('axios');
var q = require('q');
var util = require('util');

var Organization = require('./db/models/organization');
var mocks = require('./mocks/trello');
var secrets = require('./secrets');
var trelloEndpoints = require('./api/endpoints').trello;
var trelloKey = secrets.TRELLO_API_KEY;

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
      ethBalance: 100,
      ethAddress: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
      workers: [],
      tasks: []
    });
    Organization.findOne({ email: req.body.email })
      .then(org => {
        if (org && org._id) {
          res.send({
            error: true,
            message: 'Sorry, that email already exists. Login or enter a new email',
            status: 400
          });
          return false
        }
        return true
      })
      .then(unique => {
        if (unique) {
          organization.save()
            .then(function(_org) {
              req.session.userId = _org._id;
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
        }
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

app.post('/trello/projects', function (req, res) {
  var token = req.body.token;
  var teamId = req.body.teamId || 'ateam38458566';
  var GET_PROJECTS_P = trelloEndpoints.GET_PROJECTS_P;
  var GET_PROJECTS_S = trelloEndpoints.GET_PROJECTS_S;

  var endpoint = `${GET_PROJECTS_P + teamId + GET_PROJECTS_S}?key=${trelloKey}&token=${token}`;
  axios.get(endpoint)
    .then(function(projects) {
      res.send(projects.data)
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.post('/trello/tasks', function (req, res) {
  var token = req.body.token;
  var projectId = req.body.projectId;
  var GET_TASKS_P = trelloEndpoints.GET_TASKS_P;
  var GET_TASKS_S = trelloEndpoints.GET_TASKS_S;

  var endpoint = `${GET_TASKS_P + projectId + GET_TASKS_S}?key=${trelloKey}&token=${token}`;
  axios.get(endpoint)
    .then(function(tasks) {
      res.send(tasks.data)
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.post('/trello/workers', function (req, res) {
  var token = req.body.token;
  var orgId = req.body.orgId;
  var GET_WORKERS_P = trelloEndpoints.GET_WORKERS_P;
  var GET_WORKERS_S = trelloEndpoints.GET_WORKERS_S;
  var GET_WORKER = trelloEndpoints.GET_WORKER;

  var workersEndpoint = `${GET_WORKERS_P + 'ateam38458566' + GET_WORKERS_S}?key=${trelloKey}&token=${token}`;
  axios.get(workersEndpoint)
    .then(function(workers) {
      return workers.data;
    })
    .then(function(workers) {
      var _workers = workers.map(function(worker) {
        var workerEndpoint = `${GET_WORKER + worker.id}?key=${trelloKey}&token=${token}`;
        return axios.get(workerEndpoint).then(function(res) {
          return res.data;
        })
      })
      return q.all(_workers);
    })
    .then(function(workers) {
      res.send(workers);
    })
    .catch(function(err) {
      console.log(err)
      res.send({error: err})
    });
});

app.post('/trello/workers/update', function (req, res) {
  var id = req.session.userId;
  var trelloId = req.body.projectId;
  var workers = req.body.workers;

  return Organization.update(
    { "_id" : id, "projects.trelloId": trelloId },
    { $set : {"projects.$.workers" : workers} }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.post('/trello/tasks/update', function (req, res) {
  var id = req.session.userId;
  var trelloId = req.body.projectId;
  var tasks = req.body.tasks;

  return Organization.update(
    { "_id" : id, "projects.trelloId": trelloId },
    { $set : {"projects.$.tasks" : tasks} }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.post('/trello/projects/update', function (req, res) {
  var id = req.session.userId;
  var projects = req.body.projects;

  return Organization.update(
    { "_id" : id },
    { $set : {"projects" : projects} }
  )
    .then(function(org) {
      res.send(org);
      return;
    })
    .catch(function(err) {
      res.send({error: err})
    });
});

app.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      res.send(true)
    });
  }
});

app.listen(8080);
