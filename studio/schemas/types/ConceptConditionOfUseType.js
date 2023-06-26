import { labelSingleton, referredToBy, shortDescription } from "../props";

export default {
  name: 'ConditionOfUseType',
  title: 'Condition of use type',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    referredToBy
  ]
}