import { carriedOutBy, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, broughtIntoExistence, tookOutOfExistence } from '../props'
import { defaultFieldsets } from '../fieldsets'

var capitalize = require('capitalize')

export default {
  name: 'EndOfExistence',
  type: 'document',
  title: 'Slutten på eksistens',
  fieldsets: defaultFieldsets,
  fields: [labelSingleton, tookOutOfExistence, carriedOutBy, timespanSingleton, tookPlaceAt, referredToBy],
  preview: {
    select: {
      edts: 'timespan.edtf',
      blocks: 'description',
      type: '_type',
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
