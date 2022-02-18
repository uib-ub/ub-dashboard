import { groq } from 'next-sanity'

export const datasetQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    logo,
    maintainedBy[]-> {
      "id": _id,
      label
    }
  },
}`

export const softwareQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    label,
    hasType[]-> {
      "id": _id,
      label
    },
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    logo,
    hasSoftwarePart[]-> {
      "id": _id,
      label,
      hasType[]-> {
        "id": _id,
        "type": _type,
        label
      },
      hostedBy[]-> {
        ...,
        "id": _id,
        "type": _type,
        componentOf-> {
          "id": _id,
          "type": _type,
          label
        }
      },
      runBy[]-> {
        "id": _id,
        "type": _type,
        ...,
      },
      provisionedBy[]-> {
        "id": _id,
        "type": _type,
        ...,
      }
    },
    maintainedBy[]-> {
      "id": _id,
      label
    }
  },
  "graph": *[_id == $id][0] {
    "nodes": [
      {
        "id": _id,
        "type": _type,
        label,
        "hasType": hasType[]->.label,
        "maintainedBy": maintainedBy[]->.label,
        "programmedWith": programmedWith[]->.label,
      },
      ...hasSoftwarePart[]->.hostedBy[]-> {
        "id": _id,
        "type": _type,
        label,
      },
      ...hasSoftwarePart[]->.runBy[]-> {
        "id": _id,
        "type": _type,
        label,
      },
      ...hasSoftwarePart[]-> {
        "id": _id,
        "type": _type,
        label,
        "hasType": hasType[]->.label,
      },
    ],
    "edges": [
      ...hasSoftwarePart[]-> {
        "id": ^._id + _id,
        "source": ^._id,
        "target": _id,
      },
      ...hasSoftwarePart[]->.hasType[]-> {
        "id": ^._id + _id,
        "source": ^._id,
        "target": _id,
      },
      ...hasSoftwarePart[]->.hostedBy[]-> {
        "id": ^._id + _id,
        "source": ^._id,
        "target": _id,
      },
      ...hasSoftwarePart[]->.runBy[]-> {
        "id": ^._id + _id,
        "source": ^._id,
        "target": _id,
      },
    ],
  }
}`


export const productQuery = groq`{
  "item": * [_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    logo,
    image,
    link,
    hasFile[] {
      _key,
      label,
      "url": accessPoint.asset -> url,
        "extension": accessPoint.asset -> extension
    },
    hadParticipant[] {
      assignedActor -> {
        "id": _id,
        label,
      },
        assignedRole[] -> {
          "id": _id,
          label,
        },
        "timespan": timespan.edtf,
      },
    usedService[] {
    "id": assignedService -> _id,
    "type": assignedService -> _type,
    "label": assignedService -> label,
    "period": timespan.edtf,
  },
},
"milestones": [
  ...* [_id == $id] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    referredToBy[],
    "entries": [
      {
        "timestamp": $now,
        "text": "Nå",
      },
      select(defined(timespan.endOfTheEnd) => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Avslutning",
      }),
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
    ]
  },
  ...* [references($id)] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    referredToBy[],
    "entries": [
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
    ]
  },
  ...* [_id == $id].usedService[] | order(timespan.beginOfTheBegin asc) {
    "id": assignedService -> _id,
    "label": assignedService -> label,
    "desc": assignedService -> referredToBy[],
    "entries": [
      select(defined(timespan.endOfTheEnd) => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Prosjektet slutter å bruke " + assignedService -> label,
      }),
      ...assignedService -> activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      select(defined(timespan.beginOfTheBegin) => {
        "timestamp": timespan.beginOfTheBegin,
        "text": "Prosjektet begynner å bruke " + assignedService -> label,
      })
    ]
  }
]
}`;

export const projectQuery = groq`{
  "item": * [_id == $id][0] {
    "id": _id,
    "type": _type,
    status,
    label,
    hasType[]-> {
      "id": _id,
      label
    },
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    logo,
    image,
    link,
    hasFile[] {
      _key,
      label,
      "url": accessPoint.asset -> url,
      "extension": accessPoint.asset -> extension
    },
    continued[] -> {
      "id": _id,
      label
    },
    continuedBy[] -> {
      "id": _id,
      label
    },
    hasTeam[] -> {
      "id": _id,
      label,
      hasMember[] {
        assignedActor-> {
          "id": _id,
          label,
        },
        assignedRole[]-> {
          "id": _id,
          label,
        },
        "timespan": timespan.edtf,
        "active": select(timespan.endOfTheEnd < now() => false, true)
      }
    },
  "identifier": identifiedBy[] {
    _type == 'Identifier' => {
      content,
        "type": hasType -> label
    }
  },
  "funding": activityStream[] -> {
    _type == 'FundingActivity' => {
    "id": _id,
      "type": _type,
        label,
        "awarder": awarder -> label,
        "amount": fundingAmount.value,
        "currency": fundingAmount.hasCurrency -> label,
        "period": timespan.edtf,
      }
    },
    carriedOutBy[] {
      assignedActor -> {
        "id": _id,
        label,
      },
        assignedRole[] -> {
          "id": _id,
          label,
        },
        "timespan": timespan.edtf,
        },
    hadParticipant[] {
      assignedActor -> {
        "id": _id,
        label,
      },
        assignedRole[] -> {
          "id": _id,
          label,
        },
        "timespan": timespan.edtf,
        },
    resultedIn[] -> {
      "id": _id,
      "type": _type,
      "period": timespan.edtf,
      label,
      usedService[] {
        "id": assignedService -> _id,
        "type": assignedService -> _type,
        "label": assignedService -> label,
        "period": timespan.edtf,
      }
    }
  },
"milestones": [
  ...* [_id == $id] | order(timespan.beginOfTheBegin asc) {
    "id": _id,
    "type": _type,
    "label": label,
    referredToBy[],
    "entries": [
      {
        "timestamp": $now,
        "text": "Nå",
      },
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
    ]
  },
  ...* [_type == "Project" && references($id)] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    "label": label,
    referredToBy[],
    "entries": [
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
    ]
  },
  ...* [_id == $id].resultedIn[] -> | order(timespan.beginOfTheBegin asc) {
    "id": _id,
    "label": label,
    "desc": referredToBy[],
    "entries": [
      select(defined(timespan.endOfTheEnd) => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Prosjektet avvikler " + label,
      }),
      ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      select(timespan.beginOfTheBegin != "" => {
        "timestamp": timespan.beginOfTheBegin,
        "text": "Prosjektet oppretter " + label,
      })
    ]
  },
  ...* [_id == $id].resultedIn[] -> usedService[] | order(timespan.beginOfTheBegin asc) {
    "id": assignedService -> _id,
    "label": assignedService -> label,
    "desc": assignedService -> referredToBy[],
    "entries": [
      select(defined(timespan.endOfTheEnd) => {
        "timestamp": timespan.endOfTheEnd,
        "text": "Prosjektet slutter å bruke " + assignedService -> label,
      }),
      ...assignedService -> activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
        "timestamp": timespan.beginOfTheBegin,
        "text": label,
      },
      select(defined(timespan.beginOfTheBegin) => {
        "timestamp": timespan.beginOfTheBegin,
        "text": "Prosjektet begynner å bruke " + assignedService -> label,
      })
    ]
  }
]
}`;

export const serviceQuery = groq`{
  "item": * [_id == $id][0] {
    "id": _id,
      "type": _type,
        "label": label,
          shortDescription,
          "period": timespan.edtf,
            referredToBy[],
            link,
            uses[] -> {
              "id": _id,
              "type": _type,
              label,
              hasType[]-> {
                "id": _id,
                label,
              }
            },
            endpoint[] -> {
              "id": _id,
              "type": _type,
              label,
              url,
            },
            usedPlatform[] {
      ...assignedPlatform -> {
        "id": _id,
        label,
      },
        "timespan": timespan.edtf
    },
    hadParticipant[] {
      assignedActor -> {
        "id": _id,
        label,
      },
        assignedRole[] -> {
          "id": _id,
          label,
        },
        "timespan": timespan.edtf,
    },
  },
  "milestones": [
    ...* [_id == $id] | order(timespan.beginOfTheBegin asc)  {
      "id": _id,
      "type": _type,
      "label": label,
      referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
      ]
    },
    ...* [references($id)] | order(timespan.beginOfTheBegin asc)  {
      "id": _id,
      "type": _type,
      "label": label,
      referredToBy[],
      "entries": [
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
      ]
    },
    ...* [_id == $id].usedService[] | order(timespan.beginOfTheBegin asc) {
      "id": assignedService -> _id,
      "label": assignedService -> label,
      "desc": assignedService -> referredToBy[],
      "entries": [
        select(defined(timespan.endOfTheEnd) => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService -> label,
        }),
        ...assignedService -> activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Prosjektet begynner å bruke " + assignedService -> label,
        })
      ]
    }
  ]
} `;

export const actorQuery = groq`{
  "item": * [_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    quote,
    image,
    referredToBy[],
    hasSkill[] {
      "label": competence->.label,
      level,
      shortDescription,
    },
    "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Team', 'Group']] | order(timespan.beginOfTheBegin asc)  {
      "id": _id,
      "type": _type,
      "label": label,
    },
  },
  "milestones": [
    ...* [_id == $id] | order(timespan.beginOfTheBegin asc)  {
      "id": _id,
      "type": _type,
      "label": label,
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        ...*[references($id) && _type in ['Leaving', 'TransferOfMember', 'Joining', 'Activity', 'Team']] | order(timespan.beginOfTheBegin asc)  {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
      ]
    },
  ]
}`;