import { coalesceLabel } from '../helpers'
import { referredToBy, timespanSingleton, labelSingleton, carriedOutBy, competence } from '../props'

export default {
  name: 'SoftwareCuratingService',
  type: 'document',
  title: 'Software curating service',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    labelSingleton,
    timespanSingleton,
    referredToBy,
    carriedOutBy,
    competence,
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
