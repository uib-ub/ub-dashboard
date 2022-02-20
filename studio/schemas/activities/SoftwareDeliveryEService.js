import { referredToBy, timespanSingleton, labelSingleton, competence, availability, condidionOfUse, logo } from '../props'


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
    logo,
  ],
  preview: {
    select: {
      title: 'label',
      provider: 'providedBy.label',
      edtf: 'timespan.edtf',
      media: 'logo',
      providerLogo: 'providedBy.logo',
    },
    prepare(selection) {
      const { title, provider, edtf, media, providerLogo } = selection
      return {
        title: `${title}`,
        subtitle: `${provider ?? ''} ${edtf ?? ''}`,
        media: media ?? providerLogo,
      }
    },
  },
}
