"use client"

import { DataTable } from '@/components/data-table';
import { EditIntentButton } from '@/components/edit-intent-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

const checkMembership = (arr: any) => {
  if (arr.every((m: any) => m.active === true)) {
    return false
  }
  if (!arr.every((m: any) => m.active === true) && arr.some((m: any) => m.active === true)) {
    return true
  }
  return false
}

const columns = [
  {
    accessorKey: "label",
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
        <Link href={`/groups/${row.getValue('id')}`} className='font-bold'>
          {row.getValue('label')}
        </Link>
      </div>
    )
  },

  {
    header: "Rolle",
    accessorKey: "hasMember",
    cell: ({ row }: { row: any }) => (
      <div className='flex flex-col gap-2'>
        {row.getValue('hasMember')?.map((t: any, i: number) => (
          <div key={i}>
            {t.assignedRole?.map((r: any, i: number) => (
              <Badge key={i} variant='outline'>
                {r.label} {t.timespan ? `(${t.timespan})` : null}
              </Badge>
            ))}
          </div>
        ))}
      </div>
    )
  },
  {
    Header: "Type",
    accessorKey: "hasType",
    cell: ({ row }: { row: any }) => (
      <div className='flex flex-col gap-2'>
        {row.getValue('hasType')?.map((t: any, i: number) => (
          <div key={i}>
            {t.label}
          </div>
        ))}
      </div>
    )
  },
  {
    header: "Periode",
    accessorKey: "timespan"
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }: { row: any }) => (
      <EditIntentButton size="sm" id={(row.getValue('id') as string)} />
    )
  },
];

export const MemberOf = ({ data }: { data: any }) => {
  const [activeFilter, setActiveFilter] = useState(checkMembership(data ?? []))

  const handleActiveFilter = () => {
    setActiveFilter(!activeFilter)
  }

  return (
    <div className='p-4 border rounded-sm'>
      <div className='flex align-baseline gap-2'>
        <h2>Medlem av</h2>
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
