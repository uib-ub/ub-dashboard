import { hasType, labelSingleton, referredToBy, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Endpoint',
  title: 'Endpoint',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    referredToBy
  ]
}