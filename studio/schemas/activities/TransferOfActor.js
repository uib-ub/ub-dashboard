import { coalesceLabel } from '../helpers'
import { referredToBy, featured, timespanSingleton, labelSingleton, as, transferredFrom, transferredTo } from '../props'


export default {
  name: 'TransferOfActor',
  type: 'document',
  title: 'Overføring',
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
    transferredFrom,
    transferredTo,
    as,
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
