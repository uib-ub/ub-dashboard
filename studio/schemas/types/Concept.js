import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'Concept',
  title: 'Concept',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}