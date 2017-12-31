function logout (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      res.send(true)
    });
  }
}

module.exports = logout;
