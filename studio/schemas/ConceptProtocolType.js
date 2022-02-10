import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'ProtocolType',
  title: 'Protocol type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}