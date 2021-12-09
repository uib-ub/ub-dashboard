import { file, hadParticipant, image, labelSingleton, referredToBy, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Project',
  title: 'Project',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
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