import { coalesceLabel } from "../helpers"
import { timespanSingleton } from "../props"

export default {
  name: 'ServiceUsageAssignment',
  type: 'object',
  title: 'Bruk av tjeneste',
  fields: [
    {
      name: 'assignedService',
      title: 'Used service',
      type: 'reference',
      to: [
        { type: 'Service' },
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    timespanSingleton,

  ],
  preview: {
    select: {
      service: 'assignedService.label',
      edtf: 'timespan.edtf'
    },
    prepare(selection) {
      const { service, edtf } = selection
      return {
        title: coalesceLabel(service),
        subtitle: edtf
      }
    },
  },
}
