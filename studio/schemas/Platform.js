import { labelSingleton, link, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'Platform',
  title: 'Plattform',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy,
    uses,
    link
  ]
}