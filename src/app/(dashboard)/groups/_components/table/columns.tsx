"use client"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { GroupProps } from '../groups'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { EditIntentButton } from '@/components/edit-intent-button'

export const columns: ColumnDef<GroupProps>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='p-1'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Navn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className='flex gap-3 w-[200px]'>
        <Link href={`/groups/${row.getValue('id')}`} className='font-bold'>
          {row.getValue('label')}
        </Link>
      </div>
    )
  },
  {
    header: "Type",
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
    accessorKey: "period",
  },
  {
    header: "Status",
    accessorKey: "active",
  },
  {
    header: "Beskrivelse",
    accessorKey: "shortDescription",
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }) => (
      <EditIntentButton size="sm" variant={'secondary'} id={(row.getValue('id') as string)} />
    )
  },
]
