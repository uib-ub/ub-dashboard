import { hasType, labelSingleton, link, programmedWith, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'VolatileSoftware',
  title: 'Source code',
  type: 'document',
  fieldsets: [
    {
      name: 'core',
      title: 'Kjernemetadata',
      options: {
        collapsible: true,
        collapsed: false,
      }
    },
    {
      name: 'extra',
      title: 'Ekstra',
      options: {
        columns: 2
      },
    }
  ],
  fields: [
    {
      ...labelSingleton,
    },
    {
      ...shortDescription,
    },
    {
      ...referredToBy,
      fieldset: 'core',
    },
    {
      ...hasType,
      fieldset: 'core',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'SoftwareType' }] }
      ]
    },
    {
      name: 'hostedBy',
      title: 'Source code hosted by',
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
    {
      ...programmedWith,
      fieldset: 'extra',
      description: 'Only use if necessary, prefer to register on source code.'
    },
    {
      ...uses,
      fieldset: 'extra',
    },
    link,
    /* This feels wrong... {
      name: 'curatedBy',
      title: 'Kuratert av',
      type: 'reference',
      to: [
        { type: 'SoftwareCuratingService' },
      ]
    }, */
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({ title }) {
      return {
        title: `⌨️ ${title}`,
        subtitle: `Kildekode`,
      };
    },
  },
}