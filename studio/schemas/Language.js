import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'Language',
  title: 'Language (do not use)',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}