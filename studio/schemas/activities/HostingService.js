import { referredToBy, timespanSingleton, labelSingleton } from '../props'

export default {
  name: 'HostingService',
  type: 'document',
  title: 'Hosting service',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      ...labelSingleton,
      validation: Rule => Rule,
    },
    {
      name: 'componentOf',
      title: 'Hosting provider',
      description: 'Who provides this service?',
      type: 'reference',
      to: [{ type: 'SoftwareDeliveryEService' }]
    },
    /*     {
      name: 'providedBy',
      title: 'Access points',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'Group' },
          { type: 'Actor' },
        ]
      }]
    }, */
    {
      name: 'designatedAccessPoint',
      title: 'Access points',
      type: 'array',
      of: [{ type: 'AccessPoint' }]

    },
    timespanSingleton,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'label',
      provider: 'componentOf.label',
      accessPoint: 'designatedAccessPoint.0.url',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { title, provider, edtf, accessPoint } = selection
      return {
        title: `${title ?? provider} ${edtf ?? ''}`,
        subtitle: accessPoint,
      }
    },
  },
}
