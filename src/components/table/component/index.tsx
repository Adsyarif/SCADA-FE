import { useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, Eye, Pencil, Trash } from "lucide-react"
import { TableProps } from "../type"

export function Table<T extends { id: string | number }>({
  data,
  columns,
  rowsPerPage = 5,
  onView,
  onEdit,
  onDelete,
}: TableProps<T>) {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(data.length / rowsPerPage)

  const currentData = useMemo(
    () => data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [data, page, rowsPerPage]
  )

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
          {currentData.map((row) => (
            <tr key={String(row.id)}>
              {columns.map((col) => {
                const value = row[col.accessor]
                return (
                  <td
                    key={String(col.accessor)}
                    className="px-4 py-2 whitespace-nowrap text-center"
                  >
                    {col.cell ? col.cell(value, row) : String(value)}
                  </td>
                )
              })}

              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium space-x-2 text-gray-500 text-center">
                <button
                  onClick={() => onView?.(row)}
                  className="px-2 py-1 rounded-md bg-blue-200 hover:bg-blue-300"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => onEdit?.(row)}
                  className="px-2 py-1 rounded-md bg-green-200 hover:bg-green-300"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete?.(row)}
                  className="px-2 py-1 rounded-md bg-red-200 hover:bg-red-300"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between py-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
          disabled={page === pageCount}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
