import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'ProgrammingLanguage',
  title: 'Programming language',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}