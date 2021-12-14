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
          { title: 'Produksjon', value: 'production' },
          { title: 'Test', value: 'test' },
          { title: 'Dev', value: 'dev' },
          { title: 'API', value: 'api' },
          { title: 'Git', value: 'git' },
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
