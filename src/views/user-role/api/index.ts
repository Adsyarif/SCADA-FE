import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedRoles, UserRole } from "../types";
import axiosInstance from "@/api/axiosClient";
import { AxiosResponse } from "axios";
import { RoleFormData } from "../schema";
import { useRouter } from "next/router";

export function usePaginatedUserRoles(page: number, limit: number) {
  return useQuery<PaginatedRoles, Error>({
    queryKey: ['user-roles', page],
    queryFn: () =>
      axiosInstance
        .get<PaginatedRoles>(`/user-role?page=${page}&limit=${limit}`)
        .then(res => res.data),
  })
}

export function useDeleteUserRoles(role: UserRole) {
  const qc = useQueryClient()
  if (confirm(`Delete role ${role.name}?`)) {
    axiosInstance.delete(`user-role/${role.id}`).then(() => {
      qc.invalidateQueries({ queryKey: ['user-roles']})
    })
  }
}

type Permission = { id: string; permissionName: string };
export function useGetPermissions() {
  return useQuery<Permission[], Error>({
    queryKey: ['permission'],
    queryFn: () =>
      axiosInstance.get<Permission[]>('/permissions').then((res) => res.data ),
  })
}

export function useCreateRole() {
  const qc = useQueryClient()
  const router = useRouter();
  
  return useMutation<AxiosResponse<any>, Error, RoleFormData>({
    mutationFn: (data) => axiosInstance.post('/user-role', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles']})
      router.push('/user-role')
    }
  })
}

export function useUpdateRole(roleId: string) {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation<AxiosResponse<any>, Error, RoleFormData>({
    mutationFn: data => axiosInstance.put(`/user-role/${roleId}`, data),
    onSuccess:
      () => qc.invalidateQueries({queryKey: ['user-role']})
  })
}

