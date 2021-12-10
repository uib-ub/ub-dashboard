import { hasType, labelSingleton, link, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'Software',
  title: 'Software',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    referredToBy,
    uses,
    link
  ]
}