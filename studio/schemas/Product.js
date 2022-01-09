import { hasFile, hadParticipant, image, labelSingleton, link, referredToBy, usedService, shortDescription, timespanSingleton, composedOfProducts } from "./props";

export default {
  name: 'Product',
  title: 'Product',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy,
    timespanSingleton,
    link,
    usedService,
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
    }, image,
    hasFile
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