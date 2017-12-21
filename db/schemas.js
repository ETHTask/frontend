var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TaskSchema = new Schema({
    jiraId: String,
    url: String,
    reward: String
});
var WorkerSchema = new Schema({
    jiraId: String,
    imageUrl: String,
    name: String,
    ethAddress: String
});
var OrganizationSchema = new Schema({
    name: String,
    email: String,
    repName: String,
    password: String,
    ethBalance: Number,
    ethAddress: String,
    workers: [WorkerSchema],
    tasks: [TaskSchema]
});

module.exports = {
  TaskSchema,
  WorkerSchema,
  OrganizationSchema
};
