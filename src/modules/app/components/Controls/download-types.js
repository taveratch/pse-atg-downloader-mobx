import I18n from 'src/common/I18n'
import _ from 'lodash'
import { downloadTypes } from 'src/constants'

export const downloadTypesObj = () => (
  {
    [downloadTypes.EVERY]: {
      label: I18n.t('app.download.type.every'),
      type: downloadTypes.EVERY
    },
    [downloadTypes.HOURLY]: {
      label: I18n.t('app.download.type.hourly'),
      type: downloadTypes.HOURLY
    },
    [downloadTypes.DAILT]: {
      label: I18n.t('app.download.type.daily'),
      type: downloadTypes.DAILY
    }
  }
)

export default () => _.map(downloadTypesObj(), x => x)