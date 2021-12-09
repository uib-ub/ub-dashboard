import { carriedOutBy, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { timespanAsString } from '../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Birth',
  type: 'document',
  title: 'Fødsel',
  titleEN: 'Birth',
  fieldsets: defaultFieldsets,
  fields: [labelSingleton, featured, carriedOutBy, timespanSingleton, tookPlaceAt, referredToBy],
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
