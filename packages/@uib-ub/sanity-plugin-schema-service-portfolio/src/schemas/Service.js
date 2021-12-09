import { hasType, labelSingleton, referredToBy, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Service',
  title: 'Service',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    referredToBy
  ]
}