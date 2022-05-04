import { tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton, separatedFrom, separated } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'Leaving',
  type: 'document',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    referredToBy,
    timespanSingleton,
    separated,
    separatedFrom,
    tookPlaceAt,
  ],
  preview: {
    select: {
      type: '_type',
      separated: 'separated.0.label',
      separatedFrom: 'separatedFrom.label',
      media: 'separatedFrom.logo',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, separated, separatedFrom, media, edtf } = selection
      return {
        title: `${separated ? separated + ' ' : ''}${type} ${separatedFrom ? coalesceLabel(separatedFrom) : ''}`,
        subtitle: edtf,
        media: media
      }
    },
  },
}
