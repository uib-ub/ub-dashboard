import { hasType, labelSingleton, link, referredToBy, servesDataset, shortDescription, timespanSingleton, url } from "./props";

export default {
  name: 'AccessPoint',
  title: 'Endpoint',
  type: 'document',
  fields: [
    {
      ...labelSingleton,
      validation: Rule => Rule
    },
    {
      ...url,
      type: 'string'
    }, // Should be more generic? or some conditional?
    {
      ...hasType,
      type: 'reference',
      to: [
        { type: 'ProtocolType' }
      ]
    },
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
      type: 'hasType.label'
    },
    prepare(selection) {
      const { title, url, type } = selection

      return {
        title: `${title ?? url}`,
        subtitle: type,
      }
    },
  },
}