import { hasType, labelSingleton, link, referredToBy, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Dataset',
  title: 'Dataset',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    link,
    referredToBy
  ]
}