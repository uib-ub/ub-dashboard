import { hasType, labelSingleton, link, referredToBy, shortDescription, uses } from "../props";

export default {
  name: 'VolatileSoftware',
  title: 'Source code',
  type: 'object',
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
      name: 'hostedBy',
      title: 'Hosted by',
      type: 'array',
      of: [
        { type: 'SoftwareHostingService' }
      ]
    },
    // DEPRECATED
    uses,
    link
  ]
}