import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'AvailabilityType',
  title: 'Availability type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}