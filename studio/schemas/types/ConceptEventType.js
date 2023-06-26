import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'EventType',
  title: 'Event type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}