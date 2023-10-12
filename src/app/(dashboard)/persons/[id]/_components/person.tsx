import { groq } from 'next-sanity'

export const query = groq`*[_id == $id][0] {
  "id": _id,
  "type": _type,
  "label": label,
  hasType[]-> {
    "id": _id,
    label
  },
  shortDescription,
  quote,
  image,
  "period": timespan.edtf,
  referredToBy[],
  hasSkill[] | order(level desc) {
    "label": competence->.label,
    level,
    shortDescription,
  },
  "currentOrFormerManagerOf": *[$id in currentOrFormerManager[].assignedActor._ref]{
    "id": _id,
    "type": _type,
    label,
    "timespan": timespan.edtf,
  },
  "mentions": *[references($id) && _type in ['Software', 'VolatileSoftware', 'Product', 'Project', 'Team', 'Group']] | order(timespan.beginOfTheBegin asc)  {
    "id": _id,
    "type": _type,
    label,
  },
  "memberOf": *[_type in ['Group', 'Team'] && references(^._id)] | order(label) {
    "id": _id,
    label,
    hasType[]-> {
      "id": _id,
      label
    },
    hasMember[assignedActor._ref == $id] {
      assignedRole[]-> {
        "id": _id,
        label,
      },
      "timespan": timespan.edtf,
      defined(timespan.endOfTheEnd) == true => {
        "retired": true 
      }
    },
    "timespan": timespan.edtf,
    "active": false,
    timespan.endOfTheEnd <= now() => {
      "active": true 
    }
  },  
}`

export interface PersonProps {
  id: string
  type: string
  label: string
  image: string
  shortDescription: string
  memberOf: string[]
}

const Person = ({ data }: { data: any }) => {
  if (!data) return null

  return (
    <div>
      <h1>{data.label}</h1>
    </div>
  )
}

export default Person