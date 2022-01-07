
const visjsQuery = groq`{ 
  "groups": *[_type in ['Project']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "content": label, 
  },
  "items": [
    ...*[_type in ['Project']] {
      "id": coalesce('item-' + _id, _key),
      "content": label,
      "start": string(timespan.beginOfTheBegin),
      "end": string(timespan.endOfTheEnd),
      "group": _id,
    },
    ...*[_type in ['Project'] && defined(activityStream)].activityStream[] {
      "id": coalesce('item-' + _id, _key),
      "content": label,
      "start": string(timespan.beginOfTheBegin),
      "end": string(timespan.endOfTheEnd),
      "group": ^._id,
    }
  ]
}`;
