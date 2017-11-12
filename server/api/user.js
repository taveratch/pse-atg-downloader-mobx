import UserController from 'server/controllers/user-controller'
import VerifyTokenAdmin from 'server/utils/verify-token-admin'
import express from 'express'

let user = express()

user.use(VerifyTokenAdmin)

user.get('/', (req, res) => {
  UserController.getAll()
    .then(users => {
      res.status(200).json({
        success: true,
        data: users
      })
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: error.message
      })
    })
})

export default user