var mongoose = require('mongoose');
var schema = require('./schemas');

const WorkerModel = mongoose.model('WorkerModel', schema.WorkerSchema);
const OrganizationModel = mongoose.model('OrganizationModel', schema.OrganizationSchema);
const JiraTaskModel = mongoose.model('JiraTaskModel', schema.JiraTaskSchema);

module.exports = {
  WorkerModel,
  OrganizationModel,
  JiraTaskModel
};
