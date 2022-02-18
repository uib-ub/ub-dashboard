import { labelSingleton, referredToBy, shortDescription } from "../props";
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' })

export default {
  name: 'CompetenceType',
  title: 'Competence type',
  type: 'document',
  fields: [
    {
      ...labelSingleton,
      description: 'Kan ikke være programmeringsspråk, programware, eller format allerede registrert!',
      validation: (Rule) =>
        Rule.required().custom(async (param) => {
          const docs = await client.fetch(
            `*[label == "${param}" && _type in ["ProgrammingLanguage", "EncodingType", "Software", "VolatileSoftware"] && !(_id in path("drafts.**"))] { label }`,
            { param },
          )
          return docs.length > 1 ? 'Kan ikke være programmeringsspråk, programware, eller format allerede registrert!' : true
        }),
    },
    shortDescription,
    referredToBy
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'shortDescription',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `${title ?? ''}`,
        subtitle: subtitle
      }
    },
  },
}