import { hasType, logo, labelSingleton, link, programmedWith, referredToBy, shortDescription, uses } from "./props";
// hidden: ({ parent, value }) => !value && parent?.hasComputingCapability !== true,
export default {
  name: 'Software',
  title: 'Software',
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
      name: 'accountability',
      title: 'Ansvarlige',
      options: {
        columns: 2
      },
      hidden: ({ document }) => document?.externalSoftware === true,
    },
    {
      name: 'team',
      title: 'Team',
      hidden: ({ document }) => document?.externalSoftware === true,
    },
    {
      name: 'parts',
      title: 'Komponenter',
      hidden: ({ document }) => document?.externalSoftware === true,
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
      name: 'externalSoftware',
      title: 'Er dette ekstern software?',
      type: 'boolean',
    },
    {
      ...labelSingleton,
    },
    {
      ...referredToBy,
    },
    {
      ...shortDescription,
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
      name: 'designatedAccessPoint',
      title: 'Access point',
      fieldset: 'core',
      type: 'AccessPoint',
    },
    {
      name: 'systemOwner',
      title: 'Systemeier',
      description: 'System eier er alltid en direktøren, så vi registrer institusjon eller avdeling her.',
      fieldset: 'accountability',
      type: 'reference',
      to: [{ type: 'Group' }],

    },
    {
      name: 'productOwner',
      title: 'Produkteier',
      description: 'Hvem er ansvarlig for utviklingen og/eller driften av denne programvaren?',
      fieldset: 'accountability',
      type: 'reference',
      to: [{ type: 'Actor' }],
    },
    {
      name: 'maintainedBy',
      title: 'Eies av team',
      fieldset: 'team',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'Group' }] }],
    },
    {
      name: 'hasSoftwarePart',
      title: 'Has part',
      fieldset: 'parts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'VolatileSoftware' }] }],
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
    logo,
  ],
  preview: {
    select: {
      title: 'label',
      owner: 'maintainedBy.0.label',
      external: 'externalSoftware',
      media: 'logo',
    },
    prepare({ title, owner, external, media }) {
      return {
        title: title,
        subtitle: `${external === true ? 'Ekstern programvare. ' : ''}${owner ?? ''}`,
        media: media
      };
    },
  },
}