"use client"

import { useState } from 'react';
import { DataTable } from '@/components/data-table'
import { EditIntentButton } from '@/components/edit-intent-button';
import { Button } from '@/components/ui/button'
import { checkMembership } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
        <Link href={`/actors/${row.getValue('assignedActor').id}`} className='font-bold'>
          {row.getValue('assignedActor').label}
        </Link>
      </div>
    )
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
];


export const Participants = ({ data }: { data: any }) => {
  const [activeFilter, setActiveFilter] = useState(checkMembership(data ?? []))
  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  const path = {
    "Actor": "actor",
    "Group": "group",
  }

  return (
    <div>
      <div className='flex align-baseline gap-2'>
        {data.some((m: any) => m.active === true) && (
          <Button size={'sm'} variant={'secondary'} className='relative -bottom-1' onClick={() => handleActiveFilter()}>
            {activeFilter ? 'Vis inaktive grupper' : 'Vis aktive'}
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={data.filter((m: any) => {
        return activeFilter ? m.active !== true : m
      })} />
    </div>
  )
}