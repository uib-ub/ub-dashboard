import { FaMapMarker } from 'react-icons/fa'
import {
  editorialState,
  accessState,
  label,
  referredToBy,
  hasType,
} from './props'
import { defaultFieldsets } from './fieldsets'
import { coalesceLabel } from './helpers'
// import {KulturnavInput} from '../components/kulturnavInput/KulturnavInput'

export default {
  name: 'Place',
  type: 'document',
  title: 'Sted',
  initialValue: {
    editorialState: 'published',
    accessState: 'open',
  },
  icon: FaMapMarker,
  fieldsets: defaultFieldsets,
  fields: [
    editorialState,
    accessState,
    label,
    referredToBy,
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: coalesceLabel(title),
      }
    },
  },
}
