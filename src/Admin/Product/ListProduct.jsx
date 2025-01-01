import React, { useMemo, useReducer, useState } from 'react'
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'

import { fetchData, Person } from './fetchData'

export const ListProduct = () => {
  const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        
        
      },
      {
        accessorFn: (row) => row.name,
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
        
      },
      {
        accessorKey: 'email',
        header: () => 'Email',
        footer: (props) => props.column.id,
        
      },
      {
        accessorKey: 'created_at',
        header: () => <span>created_at</span>,
        footer: (props) => props.column.id,
        
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });


  const [sorting, setSorting] = useState([])

  const dataQuery = useQuery({
    queryKey: ['data', pagination,sorting],
    queryFn: () => fetchData(pagination,sorting),
    placeholderData: keepPreviousData,
  });

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    rowCount: dataQuery.data?.rowCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
    onSortingChange: setSorting,
    manualSorting: true,
    enableMultiSort: true,
    maxMultiSortColCount: 3,
    isMultiSortEvent: (e) => true,
  });

  return (
    <>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Sort ascending'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Sort descending'
                                : 'Clear sort'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() ] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-3 border-b border-gray-300 text-sm text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <button
            className="w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="px-2 py-1 border rounded text-sm w-16"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {dataQuery.data?.rowCount || 0} rows
        </div>
        <button
          className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => rerender()}
        >
          Force Rerender
        </button>
      </div>
    </>
  );
};
