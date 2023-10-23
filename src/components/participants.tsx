"use client"

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { InfoboxMissingData } from './infobox-missing-data';

const columns = [
  {
    accessorKey: "assignedActor",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Navn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: any }) => (
      <div className='w-[200px]'>
        <Link href={`/persons/${row.getValue('assignedActor').id}`} className='font-bold'>
          {row.getValue('assignedActor').label}
        </Link>
      </div>
    ),
  },
  {
    header: "Rolle",
    accessorKey: "assignedRole",
    cell: ({ row }: { row: any }) => (
      <div className='flex flex-col gap-2'>
        {row.getValue('assignedRole')?.map((t: any, i: number) => (
          <div key={i}>
            {t.label}
          </div>
        ))}

      </div>
    )
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


export const Participants = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col align-baseline gap-2'>
      <h2>Medlemmer</h2>
      {data ? (<DataTable columns={columns} data={data} config={{ activeFilter: true }} />) : <InfoboxMissingData>Ingen medlemmer registrert</InfoboxMissingData>}
    </div>
  )
}