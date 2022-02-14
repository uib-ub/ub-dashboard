import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'AvailabilityType',
  title: 'Availability type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}