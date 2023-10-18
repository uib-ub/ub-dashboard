import { groq } from 'next-sanity'
import { DataTable } from '@/components/data-table'
import { columns } from './table/columns'

export interface GroupProps {
  id: string
  type: string
  label: string
  hasType: {
    id: string
    label: string
  }[]
  image: string
  shortDescription: string
  memberOf: string[]
}

export const query = groq`*[_type in ['Group']] | order(label asc)  {
  "id": _id,
  "type": _type,
  label,
  hasType[]-> {
    "id": _id,
    label,
  },
  image,
  shortDescription,
}`

const Groups = ({ data }: { data: GroupProps[] }) => {
  if (!data) return null
  return (
    <DataTable data={data} columns={columns} />
  )
}

export default Groups