import { endpoint, hadParticipant, labelSingleton, link, referredToBy, serviceDescription, shortDescription, timespanSingleton, uses } from "./props";

export default {
  name: 'Service',
  title: 'Service',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy,
    timespanSingleton,
    serviceDescription,
    link,
    endpoint,
    uses,
    hadParticipant,
    {
      name: 'activityStream',
      title: 'Aktivitetsstrøm',
      titleEN: 'Activity stream',
      description:
        'En aktivitetsstrøm samler alle hendelser knyttet til denne aktøren. Fødsel og død er "inline" til personen, mens andre aktiviteter som ekteskap er egne dokument.',
      descriptionEN: 'Add all known events this smuck did',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'BeginningOfExistence' },
            { type: 'Activity' },
            { type: 'Event' },
            { type: 'Joining' },
            { type: 'Leaving' },
            { type: 'EndOfExistence' },
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
      edtf: 'timespan.edtf',
    },
    prepare(selection) {
      const { title, edtf } = selection

      return {
        title: title,
        subtitle: edtf,
      }
    },
  },
}