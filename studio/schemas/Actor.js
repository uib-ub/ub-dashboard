import { competence, imageSingleton, labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'Actor',
  title: 'Person',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    {
      name: 'quote',
      title: 'Sitat',
      description: 'Kort, kort sitat med hermetegn!',
      type: 'string'
    },
    referredToBy,
    {
      name: 'hasSkill',
      title: 'Kompetanse',
      type: 'array',
      of: [{ type: 'Skill' }]
    },
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
            { type: 'Birth' },
            { type: 'Activity' },
            { type: 'Event' },
            { type: 'Joining' },
            { type: 'TransferOfMember' },
            { type: 'Leaving' },
            { type: 'Death' },
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
    imageSingleton
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'shortDescription',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: `${title ?? ''}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
}