import { ComponentProps } from "react"
import { clsx } from "clsx"

type InputProps = ComponentProps<"input"> & {
  label?: string;
};

export const Input = ({ className, label, ...props}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {!!label && (
        <label className="text-sm font-medium text-gray-500" htmlFor={props?.id}>{label}</label>
      )}
      <input {...props} className={clsx("h-10 px-4 rounded-md border border-gray-300 focus:border-primary transition-color !outline-none", className)} />
    </div>
  )
}