import { timespan, tookPlaceAt, referredToBy, motivatedBy, featured, labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent Actor

export default {
  name: 'Dissolution',
  type: 'document',
  title: 'Oppløsing',
  titleEN: 'Dissolution',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, edtf } = selection
      return {
        title: `${capitalize(type)}`,
        subtitle: edtf,
      }
    },
  },
}
