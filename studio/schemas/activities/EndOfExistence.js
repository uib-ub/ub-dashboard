import { carriedOutBy, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, broughtIntoExistence, tookOutOfExistence } from '../props'
import { defaultFieldsets } from '../fieldsets'

export default {
  name: 'EndOfExistence',
  type: 'document',
  title: 'Slutten på eksistens',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    tookOutOfExistence,
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
