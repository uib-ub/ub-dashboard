import { SanityImageAssetDocument, groq } from 'next-sanity'
import { DataTable } from '@/components/data-table'
import { columns } from './table/columns'

export type PersonListProps = {
  id: string
  type?: string
  label?: string
  image?: SanityImageAssetDocument
  shortDescription?: string
  memberOf?: string[]
}

export const query = groq`*[_type in ["Actor"]] | order(label asc) {
    "id": _id,
    "type": _type,
    label,
    image,
    shortDescription,
    "period": timespan.edtf,
    "active": "Aktiv",
    !defined(timespan) => {
      "active": "Ukjent" 
    },
    timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now() => {
      "active": "Pensjonist eller jobber ikke lenger på UB" 
    },
    "memberOf": *[_type == "Group" && references(^._id) && timespan.endOfTheEnd != '' && timespan.endOfTheEnd <= now()].label
  }`

const Persons = ({ data }: { data: PersonListProps[] }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      config={{
        labelSearch: true,
        activeFilter: true,
      }}
    />
  )
}

export default Persons