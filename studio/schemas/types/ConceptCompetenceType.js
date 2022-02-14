import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'CompetenceType',
  title: 'Competence type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}