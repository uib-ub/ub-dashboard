import { coalesceLabel } from '../helpers'
import { referredToBy, timespanSingleton, labelSingleton, carriedOutBy, competence, availability, condidionOfUse } from '../props'


export default {
  name: 'SoftwareDeliveryEService',
  type: 'object',
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
    carriedOutBy,
    {
      name: 'providesAccessPoint',
      title: 'Access points',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'AccessPoint' }]
      }]
    },
    {
      name: 'hostSoftwareObject',
      title: 'holder software',
      type: 'reference',
      to: [
        { type: 'VolatileSoftware' },
        { type: 'Software' },
      ]
    },
    competence,
    availability,
    condidionOfUse,
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
