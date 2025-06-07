import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PaginatedRoles, UserRole as RoleType } from "@/views/user-role";
import axiosInstance from "@/api/axiosClient";
import { PaginatedRtus, RtuConfiguration } from "@/views/rtu-configuration/types";
import { PaginatedUsers, User, UserFormData } from "../types";
import { UserFormValues } from "../schema";

export function useUserRoles() {
    return useQuery<RoleType[], Error>({
        queryKey: ['user-roles'],
        queryFn: () => 
            axiosInstance.get<PaginatedRoles>('/user-role?page=1&limit=10').then((res) => res.data.data.map(role => ({
                id: role.id,
                name: role.roleName,
                permissions: role.permissions.map(p => p?.permission?.permissionName).filter(Boolean),
            })))
    })
}

export function useRtuConfigurations() {
  return useQuery<RtuConfiguration[], Error>({
    queryKey: ["rtu-configurations"],
    queryFn: () =>
      axiosInstance
        .get<PaginatedRtus>("/rtu-configuration?page=1&limit=100")
        .then((res) => res.data.data),
  });
}


export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation<void, Error, UserFormData>({
    mutationFn: (data) => axiosInstance.post("/users", data).then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUsers(page: number, limit: number) {
  return useQuery<PaginatedUsers, Error>({
    queryKey: ['users', page, limit],
    queryFn: () =>
      axiosInstance.get<PaginatedUsers>(`/users?page=${page}&limit=${limit}`)
        .then(res => res.data),
  });
}

export function useUser(userId: string) {
  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => axiosInstance.get<User>(`/users/${userId}`).then(res => res.data),
    enabled: !!userId,
  });
}

export function useUpdateUser(userId: string) {
  const qc = useQueryClient();
  return useMutation<void, Error, UserFormValues>({
    mutationFn: (data) => axiosInstance.put(`/users/${userId}`, data).then(() => {}),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"]});
      qc.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => axiosInstance.delete(`/users/${id}`).then(() => {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}