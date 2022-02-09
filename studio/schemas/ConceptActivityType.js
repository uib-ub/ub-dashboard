import { labelSingleton, referredToBy, shortDescription } from "./props";

export default {
  name: 'ActivityType',
  title: 'Activity type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}