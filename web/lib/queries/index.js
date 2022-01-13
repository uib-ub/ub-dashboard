import { groq } from 'next-sanity'

export const productQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    image,
    link,
    hasFile[] {
      _key,
      label,
      "url": accessPoint.asset->url,
      "extension": accessPoint.asset->extension
    },
    hadParticipant[] {
      assignedActor-> {
        "id": _id,
        label,
      },
      assignedRole[]-> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
    },
  },
  "milestones": [
    ...*[_id == $id] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
    ...*[references($id)] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
    ...*[_id == $id].usedService[] | order(timespan.beginOfTheBegin asc) {
      "id": assignedService->_id,
      "label": assignedService->label,
      "desc": assignedService->referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        select(defined(timespan.endOfTheEnd) => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService->label,
        }),
        ...assignedService->activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Prosjektet begynner å bruke " + assignedService->label,
        })
      ]
    }
  ]
}`;

export const projectQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    image,
    link,
    hasFile[] {
      _key,
      label,
      "url": accessPoint.asset->url,
      "extension": accessPoint.asset->extension
    },
    hadParticipant[] {
      assignedActor-> {
        "id": _id,
        label,
      },
      assignedRole[]-> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
    },
  },
  "milestones": [
    ...*[_id == $id] | order(timespan.beginOfTheBegin asc) {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        }),
      ]
    },
    ...*[_type == "Project" && references($id)] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
    ...*[_id == $id].resultedIn[]-> | order(timespan.beginOfTheBegin asc) {
      "id": _id,
      "label": label,
      "desc": referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
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
    ...*[_id == $id].resultedIn[]->usedService[] | order(timespan.beginOfTheBegin asc) {
      "id": assignedService->_id,
      "label": assignedService->label,
      "desc": assignedService->referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        select(defined(timespan.endOfTheEnd) => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService->label,
        }),
        ...assignedService->activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Prosjektet begynner å bruke " + assignedService->label,
        })
      ]
    }
  ]
}`;

export const serviceQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    "period": timespan.edtf,
    referredToBy[],
    link,
    uses[]-> {
      "id": _id,
      "type": _type,
      label,
      hasType[]-> {
        "id": _id,
        label,
      }
    },
    endpoint[]-> {
      "id": _id,
      "type": _type,
      label,
      url,
    },
    usedPlatform[] {
      ...assignedPlatform-> {
        "id": _id,
        label,  
      },
      "timespan": timespan.edtf
    },
    hadParticipant[] {
      assignedActor-> {
        "id": _id,
        label,
      },
      assignedRole[]-> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
    },
  },
  "milestones": [
    ...*[_id == $id] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
    ...*[references($id)] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
    ...*[_id == $id].usedService[] | order(timespan.beginOfTheBegin asc) {
      "id": assignedService->_id,
      "label": assignedService->label,
      "desc": assignedService->referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        select(defined(timespan.endOfTheEnd) => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService->label,
        }),
        ...assignedService->activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Prosjektet begynner å bruke " + assignedService->label,
        })
      ]
    }
  ]
}`;

export const actorQuery = groq`{
  "item": *[_id == $id][0] {
    "id": _id,
    "type": _type,
    "label": label,
    shortDescription,
    referredToBy[],
  },
  "milestones": [
    ...*[_id == $id] | order(timespan.beginOfTheBegin asc)  {
      "id": _id,
      "type": _type,
      "label": label,
      referredToBy[],
      "entries": [
        {
          "timestamp": $now,
          "text": "Nå",
        },
        ...activityStream[timespan.beginOfTheBegin != ""] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
      ]
    },
    ...*[references($id) && _type in ['Project', 'Product', 'Service']] | order(timespan.beginOfTheBegin asc)  {
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
        select(defined(timespan.beginOfTheBegin) => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
        })
      ]
    },
  ]
}`;