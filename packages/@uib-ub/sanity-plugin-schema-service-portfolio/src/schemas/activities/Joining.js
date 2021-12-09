import { coalesceLabel, timespanAsString } from '../helpers'
import { referredToBy, tookPlaceAt, featured, timespanSingleton, labelSingleton } from '../props'

var capitalize = require('capitalize')

export default {
  name: 'Joining',
  type: 'document',
  title: 'Innlemmelse',
  titleEN: 'Joining',
  fieldsets: [
    {
      name: 'minimum',
      title: 'Minimumsregistrering',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    labelSingleton,
    featured,
    timespanSingleton,
    tookPlaceAt,
    {
      name: 'joinedWith',
      title: 'Innlemmet i gruppe',
      titleEN: 'Joined with',
      description: 'Group that actor(s) joined with',
      type: 'reference',
      to: [
        { type: 'Group' }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      }
    },
    {
      name: 'joined',
      title: 'Innlemmet aktør(er)',
      titleEN: 'Joined',
      description: 'Actor(s) that joined this group',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'Actor' },
          ]
        }
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
    referredToBy,
  ],
  preview: {
    select: {
      type: '_type',
      joinedWith: 'joinedWith.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { type, joinedWith, edtf } = selection
      return {
        title: `${capitalize(type)} ${joinedWith ? coalesceLabel(joinedWith) : ''}`,
        subtitle: edtf,
      }
    },
  },
}
