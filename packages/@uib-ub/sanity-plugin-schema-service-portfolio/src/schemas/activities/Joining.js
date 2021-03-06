import { coalesceLabel } from '../helpers'
import { referredToBy, tookPlaceAt, featured, timespanSingleton, labelSingleton, joinedWith, joined, as } from '../props'

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
    joinedWith,
    joined,
    as,
    tookPlaceAt,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      joinedWith: 'joinedWith.label',
      joined: 'joined.0.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, joinedWith, joined, edtf } = selection
      return {
        title: `${joined ? joined + ' ' : ''}${type} ${joinedWith ? coalesceLabel(joinedWith) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
