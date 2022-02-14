import { coalesceLabel } from '../helpers'
import { referredToBy, featured, timespanSingleton, labelSingleton, as, transferredFrom, transferredTo, carriedOutBy, competence, availability, condidionOfUse } from '../props'


export default {
  name: 'SoftwareComputingEService',
  type: 'document',
  title: 'Software computing service',
  fieldsets: [
    {
      name: 'extra',
      title: 'Ekstra informasjon',
      options: { collapsible: true, collapsed: true },
    },
  ],
  groups: [
    {
      name: 'extra',
      title: 'Ekstra informasjon',
    },
  ],
  fields: [
    labelSingleton,
    timespanSingleton,
    {
      name: 'providedBy',
      title: 'Levert av',
      type: 'reference',
      to: [{ type: 'Group' }]
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
      name: 'designatedAccessPoint',
      title: 'Access points',
      type: 'array',
      of: [{ type: 'AccessPoint' }]
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
