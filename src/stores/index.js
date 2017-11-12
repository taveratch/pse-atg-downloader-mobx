import _ from 'lodash'
import adminSites from 'src/stores/admin/sites'
import adminUsers from 'src/stores/admin/users'
import auth from 'src/stores/auth'
import inventory from 'src/stores/inventory'

const stores = {}

_.set(stores, 'auth', auth)
_.set(stores, 'inventory', inventory)
_.set(stores, 'admin.sites', adminSites)
_.set(stores, 'admin.users', adminUsers)

export default stores