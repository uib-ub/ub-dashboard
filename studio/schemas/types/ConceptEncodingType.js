import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'EncodingType',
  title: 'Encoding type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}