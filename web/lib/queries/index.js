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
    logo,
    label,
    hasType[]-> {
      "id": _id,
      label
    },
    shortDescription,
    referredToBy[],
    "period": timespan.edtf,
    currentOrFormerSystemOwner[] {
      "id": assignedActor->._id,
      "label": assignedActor->.label,
      "role": assignedRole->.label,
      "period": timespan.edtf,
    },
    currentOrFormerManager[] {
      "id": assignedActor->._id,
      "label": assignedActor->.label,
      "role": assignedRole->.label,
      "period": timespan.edtf,
    },
    currentOrFormerMaintainerTeam[] {
      "id": assignedActor->._id,
      "label": assignedActor->.label,
      "role": assignedRole->.label,
      "period": timespan.edtf,
    },
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
        "url": designatedAccessPoint[0].value,
        "gitlabId": identifiedBy[0].content,
        "host": componentOf->.designatedAccessPoint[0].value,
        componentOf-> {
          "id": _id,
          "type": _type,
          label
        }
      },
      runBy[]-> {
        ...,
        "id": _id,
        "type": _type,
        "url": designatedAccessPoint[0].value,
        providedBy-> {
          "id": _id,
          "type": _type,
          label
        },
      },
      provisionedBy[]-> {
        ...,
        "id": _id,
        "type": _type,
        "url": designatedAccessPoint[0].value,
      }
    },
  },
  "graph": *[_id == $id][0] {
    "nodes": [
      {
        "id": _id,
        label,
        "subtitle": "Programvare",
        logo,
        "info": {
          "Type:": hasType[]->.label,
          "Eier:": currentOrFormerSystemOwner[0].assignedActor->.label,
          "Forvalter:": currentOrFormerManager[0].assignedActor->.label,
          "Team:": currentOrFormerMaintainerTeam[0].assignedActor->.label,
          "Språk:": programmedWith[0]->.label,
        }
      },
      ...hasSoftwarePart[]-> {
        "id": _id,
        label,
        shortDescription,
        "subtitle": "Kildekode",
        "info": {
          "Type:": hasType[]->.label,
        }
      },
      ...runBy[]-> {
        "id": _id,
        label,
        "subtitle": "Deployment",
        "logo": providedBy->.logo,
        "info": {
          "Leverandør:": providedBy->.label,
          "Url:": designatedAccessPoint[0].value
        }
      },
      ...hasSoftwarePart[]->.hostedBy[]-> {
        "id": _id,
        label,
        shortDescription,
        "subtitle": "Repositorium",
        "logo": coalesce(componentOf->.logo, componentOf->.providedBy->.logo),
        "info": {
          "Host:": componentOf->.label,
          "Url:": designatedAccessPoint[0].value
        },
      },
      ...hasSoftwarePart[]->.runBy[]-> {
        "id": _id,
        label,
        "subtitle": "Deployment",
        "logo": providedBy->.logo,
        "info": {
          "Leverandør:": providedBy->.label,
          "Url:": designatedAccessPoint[0].value
        }
      },
      ...hasSoftwarePart[]->.runBy[]->.provisionedBy[]-> {
        "id": _id,
        label,
        "subtitle": "Provisioning repository",
        "logo": providedBy->.logo,
        "info": {
          "Leverandør:": providedBy->.label,
          "Url:": designatedAccessPoint[0].value
        }
      },
      ...hasSoftwarePart[]->.runBy[]->.accessPoint[] {
        "id": _key,
        "label": value,
        "subtitle": "Endpoint",
      },
    ],
    "edges": [
      {
        "source": ^._id,
        "target": _id,
        "label": "parts",
        "children": [
          ...runBy[]-> {
            "source": coalesce( runsOnRequest._ref, ^._id),
            "target": _id,
            "label": "Run by",
            "children": [
              ...accessPoint[] {
                "source": ^._id,
                "target": _key,
                "label": "Offers service",
              },
              ...provisionedBy[]-> {
                "source": _id,
                "target": ^._id,
                'targetHandle': 'p',
                "label": "Provisions",
              },
            ],
          },
        ]
      },
      {
        "source": ^._id,
        "target": _id,
        "label": "parts",
        "children": [
          ...hasSoftwarePart[]-> {
            "source": ^._id,
            "target": _id,
            "label": "source code parts",
            "children": [
              ...hostedBy[]-> {
                "source": ^._id,
                "target": _id,
                "label": "Hosted by",
              },
              ...runBy[]-> {
                "source": coalesce( runsOnRequest._ref, ^._id),
                "target": _id,
                "label": "Run by",
                "children": [
                  ...accessPoint[] {
                    "source": ^._id,
                    "target": _key,
                    "label": "Offers service",
                  },
                  ...provisionedBy[]-> {
                    "source": _id,
                    "target": ^._id,
                    'targetHandle': 'p',
                    "label": "Provisions",
                  },
                ],
              },
            ]
          },
        ],
      }
    ]
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
      }
    },
  "identifier": identifiedBy[] {
    _type == 'Identifier' => {
      "id": _key,
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