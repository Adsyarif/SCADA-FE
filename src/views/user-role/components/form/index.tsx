// components/UserRoleForm.tsx
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/api/axiosClient';
import type { AxiosResponse } from 'axios';
import { RoleFormData, roleSchema } from '../../schema';
import { Button, Input, Title } from '@/components';

type Permission = { id: string; permissionName: string };

export function UserRoleForm() {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    data: perms,
    isLoading: permsLoading,
    error: permsError,
  } = useQuery<Permission[], Error>({
    queryKey: ['permissions'],
    queryFn: () =>
      axiosInstance.get<Permission[]>('/permissions').then((res) => res.data ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { roleName: '', permissions: [] },
  });

  const createRole = useMutation<AxiosResponse<any>, Error, RoleFormData>({
    mutationFn: (data) => axiosInstance.post('/user-role', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['roles']});
      router.push('/user-role');
    },
  });

  const onSubmit = (data: RoleFormData) => {
    createRole.mutate(data);
  };

  if (permsLoading) return console.log('loading permission')
  if (permsError)
    return console.log(`Error loading perms: ${permsError.message}`)

  return (
    <div className="w-full">
       <Title isButton text="Create User Roles" />
  
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto p-6 space-y-6">
      <div>
        <label htmlFor="roleName" className="block font-medium">
          Role Name
        </label>
        <Input
          id="roleName"
          {...register('roleName')}
          className="mt-1 w-full border p-2 rounded"
          placeholder="e.g. Admin"
        />
        {errors.roleName && (
          <p className="text-red-600 mt-1">{errors.roleName.message}</p>
        )}
      </div>

      {/* Permissions */}
      <div>
        <p className="font-medium">Permissions</p>
        <div className="mt-2 overflow-y-auto p-3 rounded space-y-2">
          {perms!.map((p) => (
            <label key={p.id} className="flex items-center">
              <input
                type="checkbox"
                value={p.id}
                {...register('permissions')}
                className="mr-2"
              />
              {p.permissionName}
            </label>
          ))}
        </div>
        {errors.permissions && (
          <p className="text-red-600 mt-1">{errors.permissions.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={createRole.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {createRole.isPending ? 'Saving…' : 'Save Role'}
      </Button>
      {createRole.isError && (
        <p className="text-red-600 mt-2">{createRole.error.message}</p>
      )}
    </form>
    </div>
  
  );
}