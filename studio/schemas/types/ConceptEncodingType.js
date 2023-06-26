import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'EncodingType',
  title: 'Encoding type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}