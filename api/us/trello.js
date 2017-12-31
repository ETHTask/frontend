var axios = require('axios');
var q = require('q');

var secrets = require('../../secrets');
var trelloEndpoints = require('../trello-endpoints');
var Organization = require('../../db/models/organization');
var trelloKey = secrets.TRELLO_API_KEY;

function trelloTasksGET (req, res) {
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
}

function trelloWorkersGET (req, res) {
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
}

function trelloWorkersPUT (req, res) {
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
}

function trelloTasksPUT (req, res) {
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
}

function trelloProjectsPUT (req, res) {
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
}

function trelloProjectsGET (req, res) {
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
}

module.exports = {
  trelloProjectsGET: trelloProjectsGET,
  trelloProjectsPUT: trelloProjectsPUT,
  trelloTasksPUT: trelloTasksPUT,
  trelloWorkersPUT: trelloWorkersPUT,
  trelloWorkersGET: trelloWorkersGET,
  trelloTasksGET: trelloTasksGET
};
