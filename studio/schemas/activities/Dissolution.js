import { timespan, tookPlaceAt, referredToBy, motivatedBy, featured, labelSingleton, dissolved } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent Actor

export default {
  name: 'Dissolution',
  type: 'document',
  title: 'Oppløsing',
  titleEN: 'Dissolution',
  liveEdit: true,
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    dissolved,
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      label: 'label',
      type: '_type',
      edtf: 'timespan.edtf',
      dissolved: 'dissolved.label',
    },
    prepare(selection) {
      const { label, type, edtf, dissolved } = selection
      return {
        title: `${label ?? capitalize(type)}`,
        title: label ?? `Oppløsningen av ${dissolved ? coalesceLabel(dissolved) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
