import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'GroupType',
  title: 'Group type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}