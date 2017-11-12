import AuthController from 'server/controllers/auth-controller.js'
import _ from 'lodash'
import express from 'express'
import sha512 from 'sha512'

let auth = express()

/**
 * API route for verify the token. no username or password required.
 */
auth.post('/authenticate', async (req, res) => {
  let token = req.body.token
  /*If there is a token in a request, then start verify it*/
  if (token) {
    AuthController.verifyToken(token)
      .then(decoded => {
        res.status(200).json({
          success: true,
          user: decoded
        })
      })
      .catch((err) => {
        res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.',
          err: err
        })
      })
  } else {
    /* return 403 status if there is no token in a request*/
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

/* Route for sign in with username and password*/
/* @return : a object that contains user and token*/
auth.post('/signin', async (req, res) => {
  /* Get parameter from a request */
  let { email } = req.body
  let password = sha512(req.body.password).toString('hex') //use sha512 to hash the password before checking
  try {
    let user = await AuthController.signin(email, password) //calling controller to get user from database
    /* If user exists, create a token */
    let token = AuthController.createToken(user)
    res.status(200).send({
      success: true,
      user: user,
      token: token
    })
  } catch (err) { /* Otherwise, send an error */
    res.status(401).send({
      success: false,
      message: 'Incorrect username or password'
    })
  }
})

/*
  Route for signup.
  @return: a object that contains token and user.
*/
auth.post('/signup', async (req, res) => {
  /*Get parameters from a request */
  let { email, is_admin } = req.body
  let password = sha512(req.body.password).toString('hex') // hash pass with sha512
  /* Call signup() from auth-controller. */
  try {
    if(email.trim().length === 0)
      throw new Error('Email is missing')
    await AuthController.signup(_.merge({ email, is_admin }, { password }))
    /*If able to create new user, then call signin from controller to get the user that has been created. */
    let user = await AuthController.signin(email, password)
    let token = AuthController.createToken(user)
    res.status(200).send({
      success: true,
      user: user,
      token: token
    })
  } catch (err) {
    res.status(401).send({
      success: false,
      message: err.message
    })
  }
})

export default auth