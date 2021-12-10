import { endpoint, file, hadParticipant, image, labelSingleton, link, referredToBy, usedService, shortDescription, timespanSingleton } from "./props";

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
    endpoint,
    hadParticipant,
    image,
    file
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