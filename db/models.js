var mongoose = require('mongoose');
var schema = require('./schemas');

const OrganizationModel = mongoose.model('OrganizationModel', schema.OrganizationSchema);

module.exports = {
  OrganizationModel
};
