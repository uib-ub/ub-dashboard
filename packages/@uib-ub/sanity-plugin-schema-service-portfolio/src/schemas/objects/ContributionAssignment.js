import { coalesceLabel } from "../helpers"

export default {
  name: 'ContributionAssignment',
  type: 'object',
  title: 'Bidragspåstand',
  titleEN: 'Contribution Assignment',
  fields: [
    {
      name: 'assignedActor',
      title: 'Aktør',
      titleEN: 'Actor',
      type: 'reference',
      to: [
        { type: 'Actor' },
        { type: 'Group' },
      ],
      options: {
        semanticSanity: {
          '@type': '@id'
        }
      },
    },
    {
      name: 'assignedRole',
      title: 'Rolle',
      titleEN: 'Role',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'Role' }],
        },
      ],
      options: {
        semanticSanity: {
          '@container': '@set',
          '@type': '@id'
        }
      },
    },
  ],
  preview: {
    select: {
      actor: 'assignedActor.label',
      name: 'usedName.content',
      role: 'assignedRole.0.label',
    },
    prepare(selection) {
      const { actor, name, role } = selection
      return {
        title: name || coalesceLabel(actor),
        subtitle: `${role ? coalesceLabel(role) : ''}`,
      }
    },
  },
}
