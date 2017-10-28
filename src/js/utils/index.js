import _ from 'lodash'
/**
 * get index in inventories from moment date
 * @param {Array} inventories 
 * @param {Object} date (moment)
 */
export const getIndexFromDate = (inventories, date) => {
  return _.findIndex(inventories, inventory => inventory.date.isSame(date))
}

/**
 * @param {Array} inventories 
 * @param {moment} startDate 
 * @param {moment} endDate 
 */
export const filterInventoryFromDate = (inventories, startDate, endDate) => {
  return _.filter(inventories, inventory => inventory.date.isSameOrAfter(startDate) && inventory.date.isSameOrBefore(endDate))
}

export const getOnlyName = inventories => _.map(inventories, x => x.name)