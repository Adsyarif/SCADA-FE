import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Pencil,
  Trash,
} from "lucide-react";
import { LoadingPage } from "@/components/loading-page";
import { TableProps } from "../type";

export function Table<T extends { id: string | number }>({
  data,
  columns,
  rowsPerPage = 5,
  isLoading = false,
  pagination,
  currentPage,
  totalItems,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: TableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);

  const page = pagination
    ? pagination.page
    : currentPage ?? internalPage;
  const limit = pagination
    ? pagination.limit
    : rowsPerPage;
  const total = pagination
    ? pagination.total
    : totalItems ?? data.length;

  const pageCount = Math.ceil(total / limit);

  const displayData = useMemo(() => {
    if (pagination) return data;
    if (currentPage != null && totalItems != null && onPageChange) {
      const start = (page - 1) * limit;
      return data.slice(start, start + limit);
    }
    const start = (page - 1) * limit;
    return data.slice(start, start + limit);
  }, [data, page, limit, pagination, currentPage, totalItems, onPageChange]);

  if (isLoading) return <LoadingPage />;

  const changePage = (to: number) => {
    if (pagination) {
      pagination.onChangePage(to);
    } else if (onPageChange) {
      onPageChange(to);
    } else {
      setInternalPage(to);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((col) => {
                const value = row[col.accessor];
                return (
                  <td
                    key={String(col.accessor)}
                    className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                  >
                    {col.cell ? col.cell(value, row) : String(value)}
                  </td>
                );
              })}
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                {onView && (
                  <button
                    onClick={() => onView(row)}
                    className="px-2 py-1 rounded-md bg-blue-200 hover:bg-blue-300"
                  >
                    <Eye size={16} />
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="px-2 py-1 rounded-md bg-green-200 hover:bg-green-300"
                  >
                    <Pencil size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="px-2 py-1 rounded-md bg-red-200 hover:bg-red-300"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="mt-2 flex justify-end items-center space-x-2">
        <button
          onClick={() => changePage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {pageCount}
        </span>

        <button
          onClick={() => changePage(Math.min(page + 1, pageCount))}
          disabled={page === pageCount}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
