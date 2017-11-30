import FetchedStore from 'src/stores/fetched-store'
import _ from 'lodash'
import adminSite from 'src/stores/admin/site'
import adminSites from 'src/stores/admin/sites'
import adminUser from 'src/stores/admin/user'
import adminUsers from 'src/stores/admin/users'
import auth from 'src/stores/auth'
import inventory from 'src/stores/inventory'
import sites from 'src/stores/sites'

const stores = {}

_.set(stores, 'auth', auth)
_.set(stores, 'inventory', inventory)
_.set(stores, 'sites', sites)
_.set(stores, 'admin.sites', adminSites)
_.set(stores, 'admin.site', adminSite)
_.set(stores, 'admin.users', adminUsers)
_.set(stores, 'admin.user', adminUser)
_.set(stores, 'app', new FetchedStore())

export default stores