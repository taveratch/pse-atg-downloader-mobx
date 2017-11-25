import _ from 'lodash'
import adminCreateUser from 'src/stores/admin/create-user'
import adminSite from 'src/stores/admin/site'
import adminSites from 'src/stores/admin/sites'
import adminUsers from 'src/stores/admin/users'
import auth from 'src/stores/auth'
import inventory from 'src/stores/inventory'

const stores = {}

_.set(stores, 'auth', auth)
_.set(stores, 'inventory', inventory)
_.set(stores, 'admin.sites', adminSites)
_.set(stores, 'admin.site', adminSite)
_.set(stores, 'admin.users', adminUsers)
_.set(stores, 'admin.createUser', adminCreateUser)

export default stores