import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'GroupType',
  title: 'Group type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}