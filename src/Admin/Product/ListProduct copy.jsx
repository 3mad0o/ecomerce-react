import React, { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import axios from "axios";

const fetchEpisodes = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return { data, total: data.length };
};

export const ListProduct = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async () => {
    const { data: fetchedData, total } = await fetchEpisodes();
    setTotalRows(total);
    setData(fetchedData.slice(page * pageSize, (page + 1) * pageSize));
  };

  React.useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRows / pageSize),
    manualPagination: true,
    state: {
      pagination: { pageIndex: page, pageSize },
    },
    onPaginationChange: ({ pageIndex, pageSize }) => {
      setPage(pageIndex);
      setPageSize(pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-100"
                  >
                    {header.isPlaceholder
                      ? null
                      : `${header.column.columnDef.header}`}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {page + 1} of {Math.ceil(totalRows / pageSize)}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev + 1 < Math.ceil(totalRows / pageSize) ? prev + 1 : prev
            )
          }
          disabled={page + 1 >= Math.ceil(totalRows / pageSize)}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};
