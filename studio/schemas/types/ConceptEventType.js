import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'EventType',
  title: 'Event type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}