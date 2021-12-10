import { coalesceLabel } from '../helpers'
import { referredToBy, tookPlaceAt, featured, timespanSingleton, labelSingleton, joinedWith, joined } from '../props'

var capitalize = require('capitalize')

export default {
  name: 'Joining',
  type: 'document',
  title: 'Innlemmelse',
  titleEN: 'Joining',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    labelSingleton,
    featured,
    timespanSingleton,
    tookPlaceAt,
    joinedWith,
    joined,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      joinedWith: 'joinedWith.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, joinedWith, edtf } = selection
      return {
        title: `${capitalize(type)} ${joinedWith ? coalesceLabel(joinedWith) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
