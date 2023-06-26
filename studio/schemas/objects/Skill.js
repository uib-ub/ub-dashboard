import { shortDescription } from '../props'
import { defaultFieldsets } from '../fieldsets'

export default {
  name: 'Skill',
  type: 'object',
  title: 'Identifikator',
  titleEN: 'Identifier',
  fieldsets: defaultFieldsets,
  fields: [
    {
      name: 'competence',
      title: 'Kompetanse',
      type: 'reference',
      to: [
        { type: 'CompetenceType' },
        { type: 'ProgrammingLanguage' },
        { type: 'Software' },
        { type: 'VolatileSoftware' },
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'wantToLearn',
      title: 'Ønsker å lære?',
      type: 'boolean'
    },
    {
      name: 'level',
      title: 'Hvor godt kan du dette da (1-10)?',
      type: 'number',
      options: {
        range: { min: 1, max: 10, step: 1 }
      },
      validation: Rule => Rule.required()
    },
    shortDescription,
  ],
  preview: {
    select: {
      level: 'level',
      topic: 'competence.label',
      shortDescription: 'shortDescription',
    },
    prepare(selection) {
      const { level, topic, shortDescription } = selection
      return {
        title: `${topic} => ${level}`,
        subtitle: shortDescription
      }
    },
  },
}
