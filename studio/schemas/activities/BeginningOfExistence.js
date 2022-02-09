import { carriedOutBy, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, broughtIntoExistence, label } from '../props'
import { defaultFieldsets } from '../fieldsets'

export default {
  name: 'BeginningOfExistence',
  type: 'document',
  title: 'Starten på eksistens',
  fieldsets: defaultFieldsets,
  initalValue: {
    label: 'Prosjektstart'
  },
  fields: [
    labelSingleton,
    broughtIntoExistence,
    carriedOutBy,
    timespanSingleton,
    tookPlaceAt,
    referredToBy
  ],
  preview: {
    select: {
      title: 'label',
      edtf: 'timespan.edtf',
    },
    prepare(selection) {
      const { title, edtf } = selection
      return {
        title: `${title ?? 'Prosjektstart'}`,
        subtitle: edtf,
      }
    },
  },
}
