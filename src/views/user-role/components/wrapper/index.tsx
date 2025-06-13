import { LoadingPage, Table, Title } from "@/components";
import { TableColumn } from "@/components/table";
import { UserRole } from "../../types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDeleteUserRoles, usePaginatedUserRoles } from "../../api";

const columns: TableColumn<UserRole>[] = [
    { header: 'Role Name', accessor: 'name'}
]

export function UserRoleWrapper() {
    const router = useRouter()
    const qc = useQueryClient()

    const [page, setPage] = useState(1)
    const limit = 10

    const {
        data: paginated,
        isLoading,
        isError,
        error,
      } = usePaginatedUserRoles(page, limit)

      const tableData: UserRole[] = paginated
      ? paginated.data.map((r) => ({
          id: r.id,
          name: r.roleName,
          permissions:  r.permissions.map((p) => p?.permission?.permissionName).filter(Boolean),
        }))
      : [];
  
    const handleAdd = () => router.push('/user-role/create');
    const handleEdit = (role: UserRole) =>
      router.push(`/user-role/${role.id}/edit`);
    const handleDelete = useDeleteUserRoles
 
    return (
        <div className="flex flex-col grow">
        <Title isButton text="User Roles" />
  
        <div className="px-4">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={handleAdd}
              className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <PlusIcon size={16} />
              Add
            </button>
          </div>
  
          {isLoading && <LoadingPage />}
          {isError && (
            <p className="text-red-600">Error: {(error as any).message}</p>
          )}
  
          {!isLoading && !isError && (
            <>
              <Table
                data={tableData}
                columns={columns}
                rowsPerPage={limit}
                onEdit={handleEdit}
                onDelete={handleDelete}
                
              />  
            </>
          )}
        </div>
      </div>
    )
}