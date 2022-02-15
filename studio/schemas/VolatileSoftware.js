import { hasType, labelSingleton, link, programmedWith, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'VolatileSoftware',
  title: 'Source code',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    {
      ...hasType,
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'SoftwareType' }] }
      ]
    },
    {
      name: 'hostedBy',
      title: 'Hosted by',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'HostingService' }]
      }]
    },
    {
      name: 'runBy',
      title: 'Deployed by',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'SoftwareComputingEService' }] }]
    },
    programmedWith,
    uses,
    link,
    referredToBy,
    {
      name: 'curatedBy',
      title: 'Kuratert av',
      type: 'reference',
      to: [
        { type: 'SoftwareCuratingService' },
      ]
    },
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({ title }) {
      return {
        title: `${title}`,
        subtitle: `Kildekode`,
      };
    },
  },
}