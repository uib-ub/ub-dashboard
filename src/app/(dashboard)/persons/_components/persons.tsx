import { SanityImageAssetDocument, groq } from 'next-sanity'
import { DataTable } from '@/components/data-table'
import { columns } from './table/columns'

export interface PersonListProps {
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
    "memberOf": *[_type == "Group" && references(^._id)].label
  }`

const Persons = ({ data }: { data: PersonListProps[] }) => {
  if (!data) return null
  return (
    <DataTable data={data} columns={columns} />
  )
}

export default Persons