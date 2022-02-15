import { referredToBy, timespanSingleton, labelSingleton, competence, availability, condidionOfUse } from '../props'

export default {
  name: 'SoftwareComputingEService',
  type: 'document',
  title: 'Software computing service',
  fieldsets: [
    {
      name: 'core',
      title: 'Kjerne metadata',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'extra',
      title: 'Ekstra informasjon',
      options: { collapsible: true, collapsed: true },
    },
  ],
  groups: [
    {
      name: 'core',
      title: 'Kjerne metadata',
    },
    {
      name: 'extra',
      title: 'Ekstra informasjon',
    },
  ],
  fields: [
    {
      ...labelSingleton,
      fieldset: 'core',
      group: 'core',
    },
    {
      ...timespanSingleton,
      fieldset: 'core',
      group: 'core',
    },
    {
      name: 'providedBy',
      title: 'Levert av',
      type: 'reference',
      to: [{ type: 'Group' }],
      fieldset: 'core',
      group: 'core',
    },
    {
      name: 'designatedAccessPoint',
      title: 'Access points',
      description: 'Tilgangspunkt for den overordnede hosten',
      type: 'array',
      of: [{ type: 'AccessPoint' }],
      fieldset: 'core',
      group: 'core',
    },
    {
      name: 'deployHookSetting',
      title: 'Deploy hook settings',
      type: 'array',
      of: [
        { type: 'VercelDeploymentConfig' },
        { type: 'NetlifyDeploymentConfig' },
      ],
      fieldset: 'core',
      group: 'core',
    },
    {
      name: 'runsOnRequest',
      title: 'Kjører software',
      type: 'reference',
      to: [
        { type: 'VolatileSoftware' },
        { type: 'Software' },
      ]
    },
    {
      name: 'hostsDataset',
      title: 'Holder dataset',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'Dataset' },
        ]
      }]
    },
    {
      name: 'curatesDataset',
      title: 'Kuraterer dataset',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'Dataset' },
        ]
      }]
    },
    {
      name: 'provisionedBy',
      title: 'Provisjonert av',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          { type: 'VolatileSoftware' },
        ]
      }]
    },
    {
      name: 'exposeService',
      title: 'Tilbyr tjeneste',
      type: 'array',
      of: [{ type: 'AccessPoint' }]
      //of: [{ type: 'EService' }]
    },
    {
      ...competence,
      fieldset: 'extra',
      group: 'extra',
    },
    {
      ...availability,
      fieldset: 'extra',
      group: 'extra',
    },
    {
      ...condidionOfUse,
      fieldset: 'extra',
      group: 'extra',
    },
    {
      ...referredToBy,
      fieldset: 'extra',
      group: 'extra',
    },
  ],
  preview: {
    select: {
      title: 'label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { title, edtf } = selection
      return {
        title: `${title} ${edtf ?? ''}`,
        subtitle: `Deployment`,
      }
    },
  },
}
