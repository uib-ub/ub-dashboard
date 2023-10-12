import { groq } from 'next-sanity'
import { DataTable } from '@/components/data-table'
import { columns } from './table/columns'

export interface PersonProps {
  id: string
  type: string
  label: string
  image: string
  shortDescription: string
  memberOf: string[]
}

export const query = groq`*[_type in ["Actor"]] | order(label asc)  {
    "id": _id,
    "type": _type,
    label,
    image,
    shortDescription,
    "memberOf": *[_type == "Group" && references(^._id)].label
  }`

const Persons = ({ data }: { data: PersonProps[] }) => {
  if (!data) return null
  return (
    <DataTable data={data} columns={columns} />
  )
}

export default Persons