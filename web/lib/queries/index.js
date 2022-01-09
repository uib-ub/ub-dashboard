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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Avslutning",
        }),
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) != "" => {
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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Avslutning",
        }),
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) != "" => {
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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService->label,
        }),
        ...assignedService->activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(timespan.beginOfTheBegin != "" => {
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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Avslutning",
        }),
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) != "" => {
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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Avslutning",
        }),
        ...activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(defined(timespan.beginOfTheBegin) != "" => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Start",
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
        select(timespan.endOfTheEnd != "" => {
          "timestamp": timespan.endOfTheEnd,
          "text": "Prosjektet slutter å bruke " + assignedService->label,
        }),
        ...assignedService->activityStream[defined(^.timespan)] | order(timespan.beginOfTheBegin desc) -> {
          "timestamp": timespan.beginOfTheBegin,
          "text": label,
        },
        select(timespan.beginOfTheBegin != "" => {
          "timestamp": timespan.beginOfTheBegin,
          "text": "Prosjektet begynner å bruke " + assignedService->label,
        })
      ]
    }
  ]
}`;
