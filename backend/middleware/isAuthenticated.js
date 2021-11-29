const isAuthenticated = (req, _res, next) => {
  // console.log(req.session);
  if (req.session.username && req.session.username !== '') {
    next()
  } else {
    next(new Error('authentication failed'))
  }
}

module.exports = isAuthenticated
