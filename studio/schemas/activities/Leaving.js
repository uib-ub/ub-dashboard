import { tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, separatedFrom, separated } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Leaving',
  type: 'document',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    timespanSingleton,
    tookPlaceAt,
    separatedFrom,
    separated,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      separatedFrom: 'separatedFrom.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, separatedFrom, edtf } = selection
      return {
        title: `${capitalize(type)} ${separatedFrom ? coalesceLabel(separatedFrom) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
