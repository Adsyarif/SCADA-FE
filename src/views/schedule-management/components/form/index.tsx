import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosClient';

import { useShifts } from '@/views/shift-management/api';

import { defSchema, DefinitionFormData, WEEKDAYS } from '../../schema';
import {
  useCreateDefinition,
  useUpdateDefinition,
} from '../../api';

import { Title, Button } from '@/components';
import { useRtuConfigurations } from '@/views/rtu-configuration/api';
import { useUserSitesByRtu } from '@/views/user-management';

interface Props {
  defId?: string;
}

export function ScheduleForm({ defId }: Props) {
  const router = useRouter();
  const isEdit = Boolean(defId);
  const qc = useQueryClient();

  // fetch RTUs, Shifts
  const { data: rtus = [] }     = useRtuConfigurations();
  const { data: shifts = [] }   = useShifts();

  // form setup
  const methods = useForm<DefinitionFormData>({
    resolver: zodResolver(defSchema),
    defaultValues: {
      rtuId:       '',
      shiftId:     '',
      daysOfWeek:  [],
      userSiteIds: [],
    },
  });
  const { watch, reset, handleSubmit, setValue, formState } = methods;
  const rtuId = watch('rtuId');
  const days  = watch('daysOfWeek');

  // fetch userSites for pick list
  const { data: userSites = [] } = useUserSitesByRtu(rtuId);

  // load existing definition if editing
  const { data: existing, isLoading: loadingDef } = useQuery({
    queryKey: ['definition', defId],
    queryFn: () => axiosInstance.get(`/schedule-defs/${defId}`).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      reset({
        rtuId:       existing.rtuId,
        shiftId:     existing.shiftId,
        daysOfWeek:  existing.daysOfWeek.split(','),
        userSiteIds: existing.userSites.map((us: { userSiteId: string }) => us.userSiteId),
      });
    }
  }, [existing, reset]);

  // mutations
  const createDef = useCreateDefinition();
  const updateDef = useUpdateDefinition(defId!);

  const onSubmit = (vals: DefinitionFormData) => {
    const fn = isEdit ? updateDef.mutate : createDef.mutate;
    fn(vals, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['defs'] });
        router.push('/schedule-management');
      }
    });
  };

  if (isEdit && loadingDef) return <div>Loading…</div>;

  return (
    <div className="w-full p-4 space-y-6">
      <Title isButton text={isEdit ? 'Edit Schedule' : 'Create Schedule'} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* RTU picker */}
          <div>
            <label className="block text-sm font-medium mb-1">RTU</label>
            <select
              className="block w-full border-gray-300 rounded p-2"
              {...methods.register('rtuId')}
            >
              <option value="">-- Select RTU --</option>
              {rtus.map(r => (
                <option key={r.id} value={r.id}>{r.rtuName}</option>
              ))}
            </select>
            {formState.errors.rtuId && (
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.rtuId.message}
              </p>
            )}
          </div>

          {/* Shift picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Shift</label>
            <select
              className="block w-full border-gray-300 rounded p-2"
              {...methods.register('shiftId')}
            >
              <option value="">-- Select Shift --</option>
              {shifts.map(s => (
                <option key={s.id} value={s.id}>{s.shiftName}</option>
              ))}
            </select>
            {formState.errors.shiftId && (
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.shiftId.message}
              </p>
            )}
          </div>

          {/* Days-of-week toggles */}
          <div>
            <p className="font-medium mb-2">Work Days</p>
            <div className="flex flex-wrap gap-2">
              {WEEKDAYS.map(d => {
                const sel = days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      const next = sel
                        ? days.filter(x => x !== d)
                        : [...days, d];
                      setValue('daysOfWeek', next, { shouldValidate: true });
                    }}
                    className={`px-3 py-1 rounded ${
                      sel
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 text-gray-700'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            {formState.errors.daysOfWeek && (
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.daysOfWeek.message}
              </p>
            )}
          </div>

          {/* User checkboxes */}
          <div>
            <p className="font-medium mb-2">Assign Users (enable check-in)</p>
            <div className="grid grid-cols-2 gap-2">
              {userSites.map(us => (
                <label key={us.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={us.id}
                    {...methods.register('userSiteIds')}
                  />
                  <span>{us.user.username} — {us.user.employee_number}</span>
                </label>
              ))}
            </div>
            {formState.errors.userSiteIds && (
              <p className="text-red-500 text-xs mt-1">
                {formState.errors.userSiteIds.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? 'Save' : 'Create'}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
