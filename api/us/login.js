var Organization = require('../../db/models/organization');

function login (req, res) {
  if (req.body.email && req.body.password) {
    Organization.authenticate(req.body.email, req.body.password, function (error, org) {
      if (error || !org) {
        res.send({
          error: true,
          status: 401,
          message: 'Sorry! You\'ve got the wrong email or password.'
        });
      } else {
        req.session.userId = org._id;
        return res.send(org);
      }
    });
  } else {
    res.send({
      error: true,
      status: 400,
      message: 'All fields are required.'
    });
  }
}

module.exports = login;
