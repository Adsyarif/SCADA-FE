// File: src/views/rtu-configuration/components/wrapper/index.tsx

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosClient";
import { RtuList } from "@/components/rtu-list";
import { Title } from "@/components";

interface RtuConfiguration {
  id: string;
  rtuName: string;
  latitude: number;
  longitude: number;
  radius: number;
}

interface PaginatedRtuResponse {
  data: RtuConfiguration[];
  total: number;
  page: number;
  limit: number;
  totalpages: number;
}

export function RtuConfigurationWrapper() {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    data: paginatedResponse,
    isLoading,
    isError,
  } = useQuery<PaginatedRtuResponse>(
    {
      queryKey: ["rtu-configurations"],
      queryFn: () =>
        axiosInstance
          .get<PaginatedRtuResponse>("/rtu-configuration")
          .then((res) => res.data),
    }
  );

  const deleteMutation = useMutation<void, Error, string>(
    {
      mutationFn: (id: string) =>
        axiosInstance.delete(`/rtu-configuration/${id}`).then(() => {}),
      onSuccess: () =>
        qc.invalidateQueries({ queryKey: ["rtu-configurations"] }),
    }
  );


  if (isLoading) {
    return <p className="p-4">Loading RTU configurations…</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-600">
        Failed to load RTUs. Please try again.
      </p>
    );
  }

  const rtuArray: RtuConfiguration[] =
    Array.isArray(paginatedResponse?.data) ? paginatedResponse.data : [];

 
  const handleAdd = () => {
    router.push("/rtu-configuration/create");
  };

  const handleEdit = (id: string) => {
    router.push(`/rtu-configuration/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this RTU?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full">
      <div>
        <Title isButton backHref="/homepage" text="RTU Configuration" />
        <div className="px-4">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={handleAdd}
              className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <PlusIcon size={16} />
              Add
            </button>
          </div>
        </div>
        <div className="space-y-4 p-4">
          {rtuArray.length > 0 ? (
            rtuArray.map((rtu) => (
              <RtuList
                key={rtu.id}
                rtuName={rtu.rtuName}
                rtuRadius={rtu.radius}
                rtuCoordinates={`${rtu.latitude}, ${rtu.longitude}`}
                onEdit={() => handleEdit(rtu.id)}
                onDelete={() => handleDelete(rtu.id)}
                isLoading={isLoading}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No RTUs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
