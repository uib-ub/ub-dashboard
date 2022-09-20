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
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktiv', value: 'active' },
          { title: 'Arkivert', value: 'archive' },
          { title: 'Forlatt', value: 'abandoned' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    labelSingleton,
    timespanSingleton,
    referredToBy,
    {
      name: 'providedBy',
      title: 'Levert av',
      type: 'reference',
      to: [{ type: 'Group' }]
    },
    competence,
  ],
  preview: {
    select: {
      title: 'label',
      provider: 'providedBy.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { title, provider, edtf } = selection
      return {
        title: `${title}`,
        subtitle: `${provider ?? ''} ${edtf ?? ''}`,
      }
    },
  },
}
