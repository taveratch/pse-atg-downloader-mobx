import 'server/utils/database.js'

/*--- Import APIs ----*/
import AuthAPI from 'server/api/auth'
import SiteAPI from 'server/api/site'
import bodyParser from 'body-parser'
import cors from 'cors'
/*--- Import dependencies ===*/
import express from 'express'
import morgan from 'morgan'

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())
app.use(morgan('dev'))

const PORT = process.env.PORT || 3001;

(async () => {
  // Establish database connection.
  // await database.start()

  app.use('/_api/auth', AuthAPI)
  app.use('/_api/site', SiteAPI)
})()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})