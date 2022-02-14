import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'ProjectType',
  title: 'Project type',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}