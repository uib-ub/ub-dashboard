import { carriedOutBy, timespan, tookPlaceAt, referredToBy, labelSingleton, deathOf } from '../props'
import { defaultFieldsets } from '../fieldsets'

var capitalize = require('capitalize')

export default {
  name: 'Death',
  type: 'document',
  title: 'Død',
  titleEN: 'Death',
  fieldsets: defaultFieldsets,
  fields: [labelSingleton, deathOf, carriedOutBy, timespan, tookPlaceAt, referredToBy],
  preview: {
    select: {
      edtf: 'timespan.edtf',
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
