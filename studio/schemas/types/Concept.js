import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'Concept',
  title: 'Concept',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}