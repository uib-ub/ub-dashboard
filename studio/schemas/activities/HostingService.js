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
    {
      name: 'hasPlatformCapability',
      title: 'Is platform?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'deployHookSetting',
      title: 'Deploy hook settings',
      type: 'array',
      hidden: ({ parent, value }) => !value && parent?.hasPlatformCapability !== true,
      of: [
        { type: 'VercelDeploymentConfig' },
        { type: 'NetlifyDeploymentConfig' },
      ],
      /* fieldset: 'core',
      group: 'core', */
    },
    {
      name: 'hasComputingCapability',
      title: 'Is host?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'exposeService',
      title: 'Tilbyr tjeneste',
      type: 'array',
      hidden: ({ parent, value }) => !value && parent?.hasComputingCapability !== true,
      of: [{ type: 'AccessPoint' }]
      //of: [{ type: 'EService' }]
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
        subtitle: provider ?? accessPoint,
      }
    },
  },
}
