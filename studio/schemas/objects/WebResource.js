import { labelSingleton } from '../props'
import { defaultFieldsets } from '../fieldsets'

export default {
  name: 'WebResource',
  title: 'Nettsider',
  type: 'object',
  fieldsets: defaultFieldsets,
  fields: [
    {
      ...labelSingleton,
      options: {
        list: [
          { title: 'Hjemmeside', value: 'homepage' },
          { title: 'Dokumentasjon', value: 'documentation' },
          { title: 'Git', value: 'git' },
          { title: 'Presentation', value: 'presentation' },
        ]
      }
    },
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
