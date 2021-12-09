import { array } from "prop-types";
import { hasType, homepage, labelSingleton, referredToBy, shortDescription, subject, subjectOf, timespanSingleton, uses } from "./props";

export default {
  name: 'Software',
  title: 'Software',
  type: 'document',
  fields: [
    labelSingleton,
    hasType,
    shortDescription,
    referredToBy,
    uses,
    {
      name: 'link',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'WebResource'
      }]
    }
  ]
}