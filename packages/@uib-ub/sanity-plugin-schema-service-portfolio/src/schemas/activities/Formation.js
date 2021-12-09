import { timespan, tookPlaceAt, referredToBy, motivatedBy, featured, labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'

var capitalize = require('capitalize')

// Implisit 'wasFormedBy' to parent actor

export default {
  name: 'Formation',
  type: 'document',
  title: 'Opprettelse',
  titleEN: 'Formation',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    {
      name: 'formedFrom',
      title: 'Opprettet fra',
      titleEN: 'Formed from',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Group' }
          ],
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    timespan,
    tookPlaceAt,
    motivatedBy,
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, edtf } = selection
      return {
        title: `${capitalize(type)}`,
        subtitle: edtf,
      }
    },
  },
}
