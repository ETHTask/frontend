var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
    repFirstName: String,
    repLastName: String,
    password: String,
    ethBalance: Number,
    ethAddress: String,
    workers: [WorkerSchema],
    tasks: [TaskSchema]
});

OrganizationSchema.pre('save', function (next) {
  var org = this;
  bcrypt.hash(org.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    org.password = hash;
    next();
  })
});

module.exports = {
  TaskSchema,
  WorkerSchema,
  OrganizationSchema
};
