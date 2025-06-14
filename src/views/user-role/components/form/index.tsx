import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/api/axiosClient'

import { RoleFormData, roleSchema } from '../../schema'
import { useCreateRole, useUpdateRole, useGetPermissions } from '../../api'
import { Button, Input, LoadingPage, Title } from '@/components'

type Props = {
  initialData?: string
}

export function UserRoleForm({ initialData }: Props) {
  const isEdit = Boolean(initialData)
  const router = useRouter()
  const qc = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { roleName: '', permissions: [] }
  })

  const {
    data: perms = [],
    isLoading: permsLoading,
    error: permsError
  } = useGetPermissions()

  const {
    data: existing,
    isLoading: loadingRole,
    isError: errorLoadingRole,
    error: loadError
  } = useQuery({
    queryKey: ['user-role', initialData],
    queryFn: () => axiosInstance.get(`/user-role/${initialData}`).then(r => r.data),
    enabled: isEdit
})

  useEffect(() => {
    if (!existing) return
      reset({
        roleName: existing.roleName,
        permissions: existing.permissions.map((p: any) => p.id)
      })
  }, [existing, reset])

  const createRole = useCreateRole()
  const updateRole = useUpdateRole(initialData!)

  const onSubmit = (data: RoleFormData) => {
    const fn = isEdit
      ? updateRole.mutate
      : createRole.mutate

    fn(data, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['user-roles'] })
        router.push('/user-role')
      }
    })
  }

  if (permsLoading || (isEdit && loadingRole)) return <LoadingPage />
  if (permsError)   return <div>Error loading permissions: {permsError.message}</div>
  if (isEdit && errorLoadingRole)
    return <div>Error loading role: {(loadError as Error).message}</div>

  return (
    <div className="w-full p-4">
      <Title
        isButton
        text={isEdit ? 'Edit User Role' : 'Create User Role'}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-6">
        <div>
          <label htmlFor="roleName" className="block font-medium">
            Role Name
          </label>
          <Input
            id="roleName"
            {...register('roleName')}
            placeholder="e.g. Admin"
            className="mt-1 w-full border p-2 rounded"
          />
          {errors.roleName && (
            <p className="text-red-600 mt-1">
              {errors.roleName.message}
            </p>
          )}
        </div>

        <div>
          <p className="font-medium">Permissions</p>
          <div className="mt-2 max-h-52 overflow-auto rounded border p-3 space-y-2">
            {perms.map(p => (
              <label key={p.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={p.id}
                  {...register('permissions')}
                  className="mr-2"
                />
                <span>{p.permissionName}</span>
              </label>
            ))}
          </div>
          {errors.permissions && (
            <p className="text-red-600 mt-1">
              {errors.permissions.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {createRole.isPending || updateRole.isPending
              ? 'Saving…'
              : 'Save Role'}
          </Button>
        </div>

        {/* Global mutation errors */}
        {createRole.isError && (
          <p className="text-red-600 mt-2">
            {(createRole.error as Error).message}
          </p>
        )}
        {isEdit && updateRole.isError && (
          <p className="text-red-600 mt-2">
            {(updateRole.error as Error).message}
          </p>
        )}
      </form>
    </div>
  )
}
