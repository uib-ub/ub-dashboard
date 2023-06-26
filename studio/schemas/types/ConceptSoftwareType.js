import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'SoftwareType',
  title: 'Software type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}