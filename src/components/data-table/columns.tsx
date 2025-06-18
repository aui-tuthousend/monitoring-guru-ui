"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

// import { Checkbox } from "@/components/ui/checkbox"

// Example of how to create columns for a User data type
type Job = {
  name: string
}

export type DataTableAttributes = {
  accessorKey: string
  header: string
}

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  job: Job
}

export const DefineColumns = (attributes: DataTableAttributes[]) => {
  const columns: ColumnDef<any>[] = attributes.map((attribute) => {
    return {
      accessorFn: (row: any) => getNestedValue(row, attribute.accessorKey),
      id: attribute.header,
      header: ({ column }: any) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {attribute.header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }: any) => <div className="pl-3">{getValue() as string}</div>,
    }
  })
  return columns
}

function getNestedValue(obj: any, keyPath: string): any {
  return keyPath.split('.').reduce((acc, key) => acc?.[key], obj)
}

