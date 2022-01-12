import { hasType, labelSingleton, referredToBy, shortDescription, subGroupOf, timespanSingleton } from "./props";

export default {
  name: 'Group',
  title: 'Group',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    timespanSingleton,
    referredToBy,
    subGroupOf,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Activity' },
            { type: 'Event' },
            { type: 'Formation' },
            { type: 'Joining' },
            { type: 'Leaving' },
            { type: 'Dissolution' },
          ]
        },
      ],
      options: {
        editModal: 'fullscreen',
        semanticSanity: {
          '@container': '@list',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'timespan.edtf',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title}`,
        subtitle: `${subtitle ?? ''}`,
      };
    },
  },
}