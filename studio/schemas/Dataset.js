import { hasType, labelSingleton, link, referredToBy, shortDescription, timespanSingleton } from "./props";

export default {
  name: 'Dataset',
  title: 'Dataset',
  type: 'document',
  liveEdit: true,
  fields: [
    labelSingleton,
    shortDescription,
    hasType,
    {
      name: 'hostedBy',
      title: 'Hosted by',
      type: 'array',
      of: [{ type: 'HostingService' }]
    },
    link,
    referredToBy
  ]
}