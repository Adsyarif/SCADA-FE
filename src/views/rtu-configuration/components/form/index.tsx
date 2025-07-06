import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { RtuFormData, rtuSchema } from "../../schema";
import { Input, Title } from "@/components";
import { useCreateRTU, useUpdateRtuConfiguration } from "../../api";


const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

interface RtuFormProps {
  initialData?: RtuFormData & { id?: string };
}

export function RtuConfigurationForm({ initialData }: RtuFormProps) {
  const router = useRouter();
  const qc = useQueryClient();
  const isEdit = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RtuFormData>({
    resolver: zodResolver(rtuSchema),
    defaultValues:
      initialData || {
        rtuName:  "",
        rtuEngineId: "",
        latitude:  -6.2,
        longitude: 106.8,
        radius:   500,
      },
  });

  const latitude  = watch("latitude");
  const longitude = watch("longitude");
  const radius    = watch("radius");
  const createRTU = useCreateRTU()
  const updateRTU = useUpdateRtuConfiguration(initialData?.id!)

  const onSubmit = (data: RtuFormData) => {
    if (isEdit) {
      updateRTU.mutate(data)
    } else {
      createRTU.mutate(data)
    }
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setValue("latitude", lat);
    setValue("longitude", lng);
    setValue("radius", radius);
  };

  
  return (
   <div className="w-full">
    <Title isButton text={isEdit ? "Edit RTU" : "Create RTU"} />
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div className="space-y-2">
        <Input
          label="RTU Name"
          type="text"
          placeholder="Enter RTU Name"
          {...register("rtuName")}
          className="border p-2 rounded w-full"
        />
        {errors.rtuName && (
          <p className="text-red-600">{errors.rtuName.message}</p>
        )}
         <Input
          label="RTU Engine ID"
          type="text"
          placeholder="Enter RTU Engine ID"
          {...register("rtuEngineId")}
          className="border p-2 rounded w-full"
        />
        
      </div>

      <div style={{ height: 300 }}>
         <MapContainer 
              style={{ height: "100%", width: "100%" }}
              center={[51.505, -0.09]} zoom={32} scrollWheelZoom={false}
              >
              <TileLayer 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
          </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Latitude"
            type="number"
            step="any"
            {...register("latitude", { valueAsNumber: true })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <Input
            label="Longitude"
            step="any"
            {...register("longitude", { valueAsNumber: true })}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Radius (meters)</label>
        <Input
          {...register("radius", { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.radius && (
          <p className="text-red-600">{errors.radius.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isEdit ? "Update RTU" : "Create RTU"}
      </button>
    </form>
   </div>
  );
}
