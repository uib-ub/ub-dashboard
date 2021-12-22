const timelines = groq`[
  ...*[_type == 'Product'] {
    _id,
    label,
    "timelines": [
      {
        "timelineName": @.label,
        "events": {
          "versions": [
            [string(@.timespan.beginOfTheBegin), "Oppstart"],
            [string(@.timespan.endOfTheEnd), "Avvikling"]
          ]
        }
      },
      ...usedService[] {
        "timelineName": assignedService->label,
        "events": {
          "versions": [
            [string(timespan.beginOfTheBegin), "Oppstart"],
            [string(timespan.endOfTheEnd), "Avvikling"]
          ]
        }
      }
    ]
  }
]`