import { coalesceLabel } from '../helpers'
import { referredToBy, tookPlaceAt, featured, timespanSingleton, labelSingleton, joinedWith, joined, as } from '../props'

export default {
  name: 'Joining',
  type: 'document',
  title: 'Innlemmelse',
  titleEN: 'Joining',
  liveEdit: true,
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
      media: 'joinedWith.logo',
      edtf: 'timespan.edtf',
      role: 'as.label'
    },
    prepare(selection) {
      const { type, joinedWith, joined, media, edtf, role } = selection
      return {
        title: `${joined ? joined + ' ' : ''}${type ?? ''} ${joinedWith ? coalesceLabel(joinedWith) : ''}`,
        subtitle: `${role ?? ''} ${edtf ?? ''}`,
        media: media
      }
    },
  },
}
