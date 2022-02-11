import { hasType, labelSingleton, link, referredToBy, shortDescription, uses } from "./props";

export default {
  name: 'Software',
  title: 'Software',
  type: 'document',
  fields: [
    labelSingleton,
    shortDescription,
    {
      ...hasType,
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'SoftwareType' }] }
      ]
    },
    referredToBy,
    {
      name: 'hasSoftwarePart',
      title: 'Has part',
      type: 'array',
      of: [{ type: 'VolatileSoftware' }]
    },
    uses,
    link
  ]
}