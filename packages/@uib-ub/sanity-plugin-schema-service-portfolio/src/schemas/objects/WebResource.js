import { editorialState, accessState, hasType, labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'
import { coalesceLabel } from '../helpers'

export default {
  name: 'WebResource',
  title: 'Nettsider',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    labelSingleton,
    {
      name: 'url',
      title: 'URL',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url'
    },
    prepare(selection) {
      const { title, url } = selection

      return {
        title: title,
        subtitle: url
      }
    },
  },
}
