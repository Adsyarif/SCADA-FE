import { UserFormData } from "@/views/user-management/types";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type RtuConfig = {
  id: string;
  rtuName: string;
}

type StepTwoProps = {
  rtus: RtuConfig[];
}

export function StepTwo({ rtus }: StepTwoProps) {
  const { register, control, setValue } = useFormContext<UserFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rtuAssignments",
  });

  const selectedIds = fields.map(f => f.rtuId);

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-medium">Informasi Penugasan: RTU</h2>
      {rtus.map(rtu => {
        const checked = selectedIds.includes(rtu.id);
        return (
          <div key={rtu.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => {
                if (e.target.checked) {
                  append({ rtuId: rtu.id, checkInStatus: false });
                } else {
                  const idx = fields.findIndex(f => f.rtuId === rtu.id);
                  if (idx !== -1) remove(idx);
                }
              }}
            />
            <span>{rtu.rtuName}</span>
          </div>
        );
      })}
    </div>
  );
}