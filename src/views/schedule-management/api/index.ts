// src/views/schedule-management/api/index.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axiosClient';
import type { Definition } from '../types';
import { DefinitionFormData } from '../schema';

export function useDefinitions() {
  return useQuery<Definition[], Error>({
    queryKey: ['defs'],
    queryFn: () => axios.get('/schedule-definition').then(r => r.data),
  });
}

export function useCreateDefinition() {
  const qc = useQueryClient();
  return useMutation<Definition, Error, DefinitionFormData>({
    mutationFn: dto => axios.post('/schedule-definition', dto).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['defs'] }),
  });
}

export function useUpdateDefinition(id: string) {
  const qc = useQueryClient();
  return useMutation<Definition, Error, DefinitionFormData>({
    mutationFn: dto => axios.put(`/schedule-definition/${id}`, dto).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['defs'] }),
  });
}

export function useDeleteDefinition() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: id => axios.delete(`/schedule-definition/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['defs'] }),
  });
}
