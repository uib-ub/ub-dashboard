import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'CompetenceType',
  title: 'Competence type',
  type: 'document',
  fields: [
    labelSingleton,
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