export type RtuAssignment = {
    rtuId: string;
    checkInStatus: boolean;
}

export type UserFormData = {
    userRoleId: string;
    employee_number: string;
    nik?: string;
    address?: string;
    phone_number?: string;
    office_phone_number?: string;
    rtuAssignments: RtuAssignment[];
    username: string;
    email: string;
    password: string;
}

export type User = {
  id: string;
  username: string;
  email: string;
  employee_number: string;
  phone_number?: string;
  office_phone_number?: string;
  address?: string;
  nik: string;
  created_at: string;
  role: { id: string; roleName: string };
  userSites: Array<{
    id: string
    rtuConfiguration: { id: string; rtuName: string };
    checkInStatus: boolean;
  }>;
}

export type PaginatedUsers = {
  data: User[];
  total: number;
  page: number;
  limit: number;
}