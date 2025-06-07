import { useState } from "react";
import { useDeleteUser, useRtuConfigurations, useUserRoles, useUsers } from "../../api";
import { Button, LoadingPage, Table, Title } from "@/components";
import { User } from "../../types";
import { TableColumn } from "@/components/table";
import { useRouter } from "next/router";
import { PlusIcon } from "lucide-react";

export default function UserManagementWrapper() {
  const { data: paginated, isLoading: loadingUsers } = useUsers(1, 10);
  const users = paginated?.data ?? [];
  const { data: roles = [], isLoading: loadingRoles } = useUserRoles();
  const { data: rtus = [], isLoading: loadingRtus } = useRtuConfigurations();
  const [filterRole, setFilterRole] = useState("");
  const [filterRtu, setFilterRtu] = useState("");
  const deleteMutation = useDeleteUser()

  const router = useRouter();

  if (loadingUsers || loadingRoles || loadingRtus) return <LoadingPage />;

  const filtered = users
    .filter(u => (filterRole ? u.role.id === filterRole : true))
    .filter(u =>
      filterRtu ? u.userSites.some(us => us.rtuConfiguration.id === filterRtu) : true
    );

  const columns: TableColumn<User>[] = [
    { header: "Username", accessor: "username" },
    {
      header: "Role",
      accessor: "role",
      cell: (_val, row) => row.role.roleName,
    },
  ];

  const handleAdd = () => {
    router.push("/user/create");
  };

  const handleEdit = (user: User) => {
    router.push(`/user/${user.id}/edit`);
  };
  const handleDelete = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      deleteMutation.mutate(user.id);
    }
  };

  return (
    <div className="p-4 space-y-4 w-full">
      <div className="flex items-center justify-between">
        <Title isButton text="User Management" />
      </div>

        <div className="flex items-center gap-4 mb-4">
            <label className="block text-xs font-medium text-gray-700">Filter by RTU</label>
            <select
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={filterRtu}
            onChange={e => setFilterRtu(e.target.value)}
            >
            <option value="">All RTUs</option>
            {rtus?.map(r => (
                <option key={r.id} value={r.id}>{r.rtuName}</option>
            ))}
            </select>
            <button
              onClick={handleAdd}
              className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <PlusIcon size={16} />
              Add
            </button>
        </div>

      <Table
        data={filtered}
        columns={columns}
        onEdit={row => {handleEdit(row)}}
        onDelete={row => {handleDelete(row)}}
      />
    </div>
  );
}