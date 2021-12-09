import { timespan, tookPlaceAt, referredToBy, featured, timespanSingleton, labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel, timespanAsString } from '../helpers'

var capitalize = require('capitalize')

export default {
  name: 'Leaving',
  type: 'document',
  title: 'Utmeldelse',
  titleEN: 'Leaving',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    featured,
    timespanSingleton,
    tookPlaceAt,
    {
      name: 'separatedFrom',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'reference',
      to: [
        { type: 'Group' }
      ],
    },
    {
      name: 'separated',
      title: 'Forlot',
      titleEN: 'Left',
      description: 'Actor(s) that left this group',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Actor' }
          ],
          options: {
            filter: '_type == "Actor" && references($id)',
            filterParams: { id: 'd4ad3e47-1498-4b95-9b7f-c25be386691a' },
          }
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      }
    },
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      separatedFrom: 'separatedFrom.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, separatedFrom, edtf } = selection
      return {
        title: `${capitalize(type)} ${separatedFrom ? coalesceLabel(separatedFrom) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
