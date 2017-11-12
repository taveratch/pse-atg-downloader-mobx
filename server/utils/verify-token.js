import AuthController from 'server/controllers/auth-controller'

export default (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
    AuthController.verifyToken(token)
      .then(async decoded => {
        req.decoded = decoded
        next()
      })
      .catch(error => {
        res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.',
          error: error.message
        })
      })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}