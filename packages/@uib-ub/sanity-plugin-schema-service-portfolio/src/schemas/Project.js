import { file, hadParticipant, image, labelSingleton, link, referredToBy, resultedIn, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Project',
  title: 'Project',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    link,
    resultedIn,
    referredToBy,
    timespanSingleton,
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