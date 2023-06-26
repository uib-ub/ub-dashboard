import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'IdentifierType',
  title: 'Identifier type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}