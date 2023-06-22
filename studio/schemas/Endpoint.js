import { hasType, labelSingleton, link, referredToBy, servesDataset, shortDescription, timespanSingleton, url } from "./props";

export default {
  name: 'Endpoint',
  title: 'Endpoint',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    url,
    hasType,
    servesDataset,
    timespanSingleton,
    referredToBy
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