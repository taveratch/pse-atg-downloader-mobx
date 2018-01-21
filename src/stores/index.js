import DownloadPage from 'src/stores/download-page'
import FetchedStore from 'src/stores/fetched-store'
import _ from 'lodash'
import adminSite from 'src/stores/admin/site'
import adminSites from 'src/stores/admin/sites'
import adminUser from 'src/stores/admin/user'
import adminUsers from 'src/stores/admin/users'
import auth from 'src/stores/auth'
import inventory from 'src/stores/inventory'
import sites from 'src/stores/sites'
import verify from 'src/stores/verify'

const stores = {}

_.set(stores, 'auth', new auth())
_.set(stores, 'verify', new verify())
_.set(stores, 'inventory', inventory)
_.set(stores, 'sites', sites)
_.set(stores, 'downloadPage', new DownloadPage())
_.set(stores, 'admin.sites', adminSites)
_.set(stores, 'admin.site', adminSite)
_.set(stores, 'admin.users', adminUsers)
_.set(stores, 'admin.user', adminUser)
_.set(stores, 'app', new FetchedStore())

export default stores