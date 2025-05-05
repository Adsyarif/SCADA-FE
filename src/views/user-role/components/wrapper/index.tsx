import { Table, Title } from "@/components";
import { TableColumn } from "@/components/table";
import { PaginatedRoles, UserRole } from "../../types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "@/api/axiosClient";

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
      } = useQuery<
        PaginatedRoles,
        Error,
        PaginatedRoles,
        ['user-roles', number]
      >({
        queryKey: ['user-roles', page],
        queryFn: () =>
          axiosInstance
            .get<PaginatedRoles>(`/user-role?page=${page}&limit=${limit}`)
            .then((res) => res.data)
      });

      const tableData: UserRole[] = paginated
      ? paginated.data.map((r) => ({
          id: r.id,
          name: r.roleName,
          permissions:  r.permissions.map((p) => p.permission.permissionName),
        }))
      : [];
  
    const handleAdd = () => router.push('/user-role/create');
    const handleView = (role: UserRole) => console.log('View', role);
    const handleEdit = (role: UserRole) =>
      router.push(`/user-role/${role.id}/edit`);
    const handleDelete = (role: UserRole) => {
      if (confirm(`Delete role ${role.name}?`)) {
        axiosInstance.delete(`/user-role/${role.id}`).then(() => {
          qc.invalidateQueries({ queryKey: ['user-roles'] });
        });
      }
    };
 
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
  
          {isLoading && <p>Loading roles…</p>}
          {isError && (
            <p className="text-red-600">Error: {(error as any).message}</p>
          )}
  
          {!isLoading && !isError && (
            <>
              <Table
                data={tableData}
                columns={columns}
                rowsPerPage={limit}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              
            </>
          )}
        </div>
      </div>
    )
}