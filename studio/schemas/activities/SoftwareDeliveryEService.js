import { coalesceLabel } from '../helpers'
import { referredToBy, timespanSingleton, labelSingleton, carriedOutBy, competence, availability, condidionOfUse } from '../props'


export default {
  name: 'SoftwareDeliveryEService',
  type: 'document',
  title: 'Software delivery service',
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
    {
      name: 'providedBy',
      title: 'Levert av',
      type: 'reference',
      to: [{ type: 'Group' }]
    },
    {
      name: 'designatedAccessPoint',
      title: 'Access points',
      type: 'array',
      of: [{ type: 'AccessPoint' }],
      options: {
        editModal: 'popover'
      }
    },
    /* {
      name: 'hostSoftwareObject',
      title: 'holder software',
      type: 'reference',
      to: [
        { type: 'VolatileSoftware' },
        { type: 'Software' },
      ]
    }, */
    competence,
    availability,
    condidionOfUse,
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
