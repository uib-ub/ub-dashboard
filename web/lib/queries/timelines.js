const timelines = groq[
  ...* [_type == 'Product'] {
  _id,
    label,
    "timelines": usedService[] {
    "timelineName": assignedService -> label,
      "events": [
        timespan
      ]
  }
},
]