import { sortBy } from 'lodash'
import { groq } from 'next-sanity'

export interface TimelineProps {
  id: string
  type: string
  label: string
  period: string
  connectedTo: {
    id: string
    type: string
    label: string
  }
  timestamp: string
}

export const query = groq`[
  ...*[_type in ['Event', 'Activity', 'Move', 'Joining', 'Leaving', 'BeginningOfExistence', 'EndOfExistence', 'Formation', 'Dissolution'] && defined(timespan)] {
    "id": _id,
    "label": coalesce(label, 'Uten label'),
    "period": timespan.edtf,
    "connectedTo": {...*[references(^._id)][0]{
        "id": _id,
        "type": _type,
        label,
    }},
    "timestamp": coalesce(
      select(
        timespan.date != "" => timespan.date
      ), 
      select(
        timespan.beginOfTheBegin != "" => timespan.beginOfTheBegin
      )
    )
  },
  ...*[_type in ['Project'] && defined(timespan.endOfTheEnd)] {
      ...select(defined(timespan.endOfTheEnd) => {
        "id": _id,
        "type": _type,
        "label": label + " avsluttes",
        "period": timespan.edtf,
        "timestamp": timespan.endOfTheEnd,
      }
    )
  },
  ...*[_type in ['Project'] && defined(timespan.beginOfTheBegin)] {
      ...select(defined(timespan.beginOfTheBegin) => {
        "id": _id,
        "type": _type,
        "label": label + " starter",
        "period": timespan.edtf,
        "timestamp": timespan.beginOfTheBegin,
      }
    )
  }
]`

const Timeline = ({ data }: { data: TimelineProps[] }) => {
  if (!data) return null
  const sortedByYear = sortBy(data, ['timestamp'])

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700 my-4">
      {sortedByYear && Object.entries(sortedByYear).reverse().map(([key, value]) => (
        <li key={value.id} className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{value.timestamp}</time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value.label}</h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{value.period}</p>
        </li>
      ))}
    </ol>
  )
}

export default Timeline