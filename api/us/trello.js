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

function trelloListsGETPOST (req, res) {
  var id = req.session.userId;
  var token = req.body.token;
  var projectId = req.body.projectId;
  var GET_LISTS_P = trelloEndpoints.GET_LISTS_P;
  var GET_LISTS_S = trelloEndpoints.GET_LISTS_S;
  var doneTrelloId;

  var endpoint = `${GET_LISTS_P + projectId + GET_LISTS_S}?key=${trelloKey}&token=${token}`;
  axios.get(endpoint)
    .then(function(lists) {
      return lists.data.find(function (list) {
        return list.name.toLowerCase() === 'done'
      }).id;
    })
    .then(function (doneListId) {
      doneTrelloId = doneListId
      return Organization.update(
        { "_id" : id },
        { $set : {"doneTrelloId" : doneTrelloId} }
      )
    })
    .then(function() {
      res.send({id: doneTrelloId});
      return;
    })
    .catch(function(err) {
      console.log(err);
      res.send({error: err})
    });
}

function trelloWorkersGET (req, res) {
  var token = req.body.token;
  var orgId = req.body.orgId;
  var GET_WORKERS_P = trelloEndpoints.GET_WORKERS_P;
  var GET_WORKERS_S = trelloEndpoints.GET_WORKERS_S;
  var GET_WORKER = trelloEndpoints.GET_WORKER;

  var workersEndpoint = `${GET_WORKERS_P + orgId + GET_WORKERS_S}?key=${trelloKey}&token=${token}`;
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
  var project = req.body.project;

  return Organization
    .findOne({"_id" : id, 'projects.trelloId': project.trelloId})
    .then(function(org) {
      if (!org) {
        return Organization.update(
          {
            "_id" : id
          },
          { $push : {"projects" : project} }
        )
      }
      return;
    })
    .then(org => {
      if (org) {
         res.send(org);
      } else {
        res.send({});
      }
    })
    .catch(function(err) {
      console.log('err', err)
      res.send({error: err})
    });
}

function trelloProjectsGET (req, res) {
  var token = req.body.token;
  var teamId = req.body.teamId;
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

function trelloTeamsGET (req, res) {
  var token = req.body.token;
  var GET_TEAMS = trelloEndpoints.GET_TEAMS;

  var endpoint = `${GET_TEAMS}?key=${trelloKey}&token=${token}`;
  axios.get(endpoint)
    .then(function(teams) {
      res.send(teams.data)
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
  trelloTasksGET: trelloTasksGET,
  trelloTeamsGET: trelloTeamsGET,
  trelloListsGETPOST: trelloListsGETPOST
};
