import { hasType, labelSingleton, link, referredToBy, servesDataset, shortDescription, timespanSingleton, url } from "./props";

export default {
  name: 'AccessPoint',
  title: 'Endpoint',
  type: 'document',
  fields: [
    labelSingleton,
    url, // Should be more generic? or some conditional?
    {
      ...hasType,
      type: 'reference',
      to: [
        { type: 'ProtocolType' }
      ]
    },
    timespanSingleton,
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
    },
    prepare(selection) {
      const { title, url } = selection

      return {
        title: title,
        subtitle: url,
      }
    },
  },
}