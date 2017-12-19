var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var JiraTaskSchema = new Schema({
    jiraID: String,
    reward: Number
});
var WorkerSchema = new Schema({
    jiraID: String,
    firstName: String,
    lastName: String,
    ethAddress: String,
    completedJiraTasks: [JiraTaskSchema]
});
var OrganizationSchema = new Schema({
    name: String,
    logo: String,
    email: String,
    repFirstName: String,
    repLastName: String,
    ethBalance: Number,
    ethAddress: String,
    workers: [WorkerSchema]
});

module.exports = {
  JiraTaskSchema,
  WorkerSchema,
  OrganizationSchema
};
