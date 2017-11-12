import _ from 'lodash'
import adminSites from 'src/stores/admin/sites'
import auth from 'src/stores/auth'
import inventory from 'src/stores/inventory'

const stores = {}

stores.auth = auth
stores.inventory = inventory
_.set(stores, 'admin.sites', adminSites)

export default stores