import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon
} from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
  size: string;
  maxW: string;
};

export function DataTable<Data extends object>({
  data,
  columns,
  size = 'md',
}: DataTableProps<Data>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns.filter(column => column?.isVisible).map(column => column.accessor)
    },
  }, useSortBy);

  return (
    <Table size={size}  {...getTableProps()}>
      {/* eslint-disable react/jsx-key */}
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(
                  column.getSortByToggleProps()
                )}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  isNumeric={cell.column.isNumeric}
                >
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
