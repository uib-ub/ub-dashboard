import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'IdentifierType',
  title: 'Identifier type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}