"use client"

import { DataTable } from '@/components/data-table'
import Link from 'next/link';
import { InfoboxMissingData } from './infobox-missing-data';
import { path } from '@/lib/utils';

const columns = [
  {
    header: "Navn",
    accessorKey: "label",
    cell: ({ row }: { row: any }) => (
      <div className='w-[200px]'>
        <Link href={`/${path[row.getValue('type')]}/${row.original.id}`} className='font-bold'>
          {row.getValue('label')}
        </Link>
      </div>
    ),
  },
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Periode",
    accessorKey: "period"
  },
  {
    header: "Status",
    accessorKey: "active",
  },
];


export const ResultedIn = ({ data, config = { activeFilter: true } }: { data: any, config?: any }) => {
  return (
    <>
      {data ? (<DataTable columns={columns} data={data} config={config} />) : <InfoboxMissingData>Ingen resultat registrert</InfoboxMissingData>}
    </>
  )
}