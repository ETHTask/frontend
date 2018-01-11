var axios = require('axios');
var Organization = require('../../db/models/organization');

function smartContractRegister (req, res) {
  return Organization.update(
    { "_id" : req.session.userId },
    { $set : {"registeredSmartContract" : true} }
  )
}

module.exports = {
  smartContractRegister: smartContractRegister
}
