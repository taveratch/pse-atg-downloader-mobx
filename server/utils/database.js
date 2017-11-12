import Sequelize from 'sequelize'
import Site from 'server/models/Site'
import SiteUser from 'server/models/SiteUser'
import User from 'server/models/User'
import config from './db-config'

let { USERNAME, PASSWORD, DB_NAME, HOST, PORT } = config

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {  
  host: HOST,
  port: PORT,
  dialect: 'mysql',
  define: {
    underscored: true
  }
})

sequelize.sync()
  

const db = {}

db.users = User(sequelize)
db.sites = Site(sequelize)
db.siteusers = SiteUser(sequelize)

db.siteusers.belongsTo(db.sites)
db.sites.hasMany(db.siteusers)
db.siteusers.belongsTo(db.users)
db.users.hasMany(db.siteusers)

export default db