var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    name: String,
    email: String,
    repFirstName: String,
    repLastName: String,
    password: String,
    ethBalance: Number,
    ethAddress: String,
    doneTrelloId: String,
    registeredSmartContract: Boolean,
    teams: [
      new Schema({
        trelloName: String,
        trelloId: String,
        displayName: String
      })
    ],
    projects: [
      new Schema({
        trelloId: String,
        name: String,
        tasks: [new Schema({
          trelloId: String,
          url: String,
          reward: String,
          name: String
        })],
        workers: [new Schema({
          trelloId: String,
          gravatarHash: String,
          name: String,
          ethAddress: String
        })]
      })
    ]
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

//authenticate input against database
OrganizationSchema.statics.authenticate = function (email, password, callback) {
  Organization.findOne({ email: email })
    .exec(function (err, org) {
      if (err) {
        return callback(err)
      } else if (!org) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, org.password, function (err, result) {
        if (result === true) {
          return callback(null, org);
        } else {
          return callback();
        }
      })
    });
}

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
