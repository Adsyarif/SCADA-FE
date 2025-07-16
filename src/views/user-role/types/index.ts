export type UserRole = {
    id: string;
    name: string;
    permissions: string[];
}

export type PaginatedRoles = {
    data: {
      id: string;
      roleName: string;
      permissions: {
        permission: { permissionName: string };
      }[];
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  