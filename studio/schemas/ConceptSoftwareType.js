import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'SoftwareType',
  title: 'Software type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}