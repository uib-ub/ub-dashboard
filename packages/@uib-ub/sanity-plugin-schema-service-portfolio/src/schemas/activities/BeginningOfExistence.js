import { carriedOutBy, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, broughtIntoExistence } from '../props'
import { defaultFieldsets } from '../fieldsets'

var capitalize = require('capitalize')

export default {
  name: 'BeginningOfExistence',
  type: 'document',
  title: 'Starten på eksistens',
  fieldsets: defaultFieldsets,
  fields: [labelSingleton, broughtIntoExistence, carriedOutBy, timespanSingleton, tookPlaceAt, referredToBy],
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
