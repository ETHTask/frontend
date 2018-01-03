var Organization = require('../../db/models/organization');

function signUp (req, res) {
  if (
    req.body.companyName &&
    req.body.email &&
    req.body.password
  ) {
    var organization = new Organization({
      name: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      repFirstName: req.body.firstName,
      repLastName: req.body.lastName,
      ethBalance: 100,
      ethAddress: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
      projects: [],
      tasks: []
    });
    Organization.findOne({ email: req.body.email })
      .then(org => {
        if (org && org._id) {
          res.send({
            error: true,
            message: 'Sorry, that email already exists. Login or enter a new email',
            status: 400
          });
          return false
        }
        return true
      })
      .then(unique => {
        if (unique) {
          organization.save()
            .then(function(_org) {
              req.session.userId = _org._id;
              res.send(_org);
              return;
            })
            .catch(function(err) {
              console.log(err)
              res.send({
                error: true,
                message: 'Sorry, there was error saving your information. Try again later!',
                status: 400
              });
            })
        }
      })
  } else {
    res.send({
      error: true,
      message: 'All fields are required',
      status: 400
    });
  }
}

module.exports = signUp;
