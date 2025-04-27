import { Table, Title } from "@/components";
import { TableColumn } from "@/components/table";
import { UserRole } from "../../types";
import { sampleRole } from "../../api/sample-data";
import { PlusIcon } from "lucide-react";

const columns: TableColumn<UserRole>[] = [
    { header: 'Role Name', accessor: 'name'}
]

export function UserRoleWrapper() {
    const handleView = (role: UserRole) => {
        console.log("View", role);
    }
    const handleEdit = (role: UserRole) => {
        console.log("Edit", role);
    }
    const handleDelete = (role: UserRole) => {
        if (confirm(`Delete role ${role.name}?`)) {
        console.log("Delete", role);
        }
    }

    return (
        <div className="flex flex-col grow">
            <Title isButton={true} text="User Role" /> 
            <div className="px-4">
                <div className="flex justify-end items-center mb-4">
                    <button
                        className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white items-center flex gap-2"
                    >
                        <PlusIcon size={16} />
                        Add
                    </button>
                </div>           
                <Table
                    data={sampleRole}
                    columns={columns}
                    rowsPerPage={5}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}