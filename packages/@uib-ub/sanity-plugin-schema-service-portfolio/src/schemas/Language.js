import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'Language',
  title: 'Language',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}