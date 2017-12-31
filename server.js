var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var session = require('express-session');
var sessionConfig = require('./api/us/session-config');
var signUp = require('./api/us/sign-up');
var login = require('./api/us/login');
var logout = require('./api/us/logout');
var trelloC = require('./api/us/trello');

mongoose.connect('mongodb://localhost:27017');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(null, 'Mongo error'));
db.once('open', console.log.bind(null, 'Mongo in'));

var app = express();
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(__dirname + "/dist"));

app.post('/signUp', signUp)
app.post('/login', login)
app.post('/trello/projects', trelloC.trelloProjectsGET);
app.post('/trello/tasks', trelloC.trelloTasksGET);
app.post('/trello/workers', trelloC.trelloWorkersGET);
app.post('/trello/workers/update', trelloC.trelloWorkersPUT);
app.post('/trello/tasks/update', trelloC.trelloTasksPUT);
app.post('/trello/projects/update', trelloC.trelloProjectsPUT);
app.post('/trello/teams', trelloC.trelloTeamsGET);
app.get('/logout', logout);

app.listen(8080);
