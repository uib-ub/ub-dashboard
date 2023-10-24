"use client"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { SoftwareProps } from './software'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { EditIntentButton } from '@/components/edit-intent-button'
import { Badge } from '@/components/ui/badge'
import { path } from '@/lib/utils'

export const columns: ColumnDef<SoftwareProps>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
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
    cell: ({ row }) => (
      <div className='w-[200px]'>
        <Link href={`/${path[row.original.type]}/${row.getValue('id')}`} className='font-bold'>
          {row.getValue('label')}
        </Link>
      </div>
    )
  },
  {
    header: "Type",
    accessorKey: "hasType",
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-2'>
        {(row.getValue('hasType') as any[])?.map((t: any, i: number) => (
          <Badge variant="secondary" className='grow-0' key={i}>
            {t.label}
          </Badge>
        ))}
      </div>
    )
  },
  {
    header: "Utviklet av UB",
    accessorKey: "madeByUB"
  },
  {
    header: "Periode",
    accessorKey: "period"
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }) => (
      <EditIntentButton size="sm" variant={'secondary'} id={(row.getValue('id') as string)} />
    )
  },
]
