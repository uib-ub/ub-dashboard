import { hasType, labelSingleton, link, referredToBy, shortDescription, timespanSingleton, url } from "./props";

export default {
  name: 'Endpoint',
  title: 'Endpoint',
  type: 'document',
  fields: [
    labelSingleton,
    url,
    hasType,
    shortDescription,
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