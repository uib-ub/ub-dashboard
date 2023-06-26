import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'NameType',
  title: 'Name type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}