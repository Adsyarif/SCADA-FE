import { twMerge } from "tailwind-merge";
import { InputProps } from "./type";
import React from "react";

export function Input(props: InputProps) {
  const { inputClassName, containerClassName, labelClassName, label, inputContainerClassName, rightNode, rightNodeClick, ...rest } =
    props;

  return (
    <div className={twMerge("space-y-1", containerClassName)}>
      {label && <p className={twMerge("text-sm text-gray-600", labelClassName)}>{label}</p>}

      <div className={twMerge("flex items-center justify-between border border-slate-400 p-2 rounded-md gap-2", inputContainerClassName)}>
        <input {...rest} className={twMerge("w-full bg-inherit outline-none ring-0 grow-1 focus:ring-0 focus:outline-none border-none focus:border-none", inputClassName)} />

        {rightNode && (
          <button type="button" className=" bg-inherit object-fit w-10 overflow-hidden outline-none ring-0 hover:outline-none hover:ring-0 hover:border-0 focus:outline-none focus:ring-0 focus:border-0" onClick={rightNodeClick}>{rightNode}</button>
        )}
      </div>
    </div>
  );
}