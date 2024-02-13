import { ComponentProps } from "react"
import { clsx } from "clsx"

type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
};

export const Textarea = ({ className, label, ...props}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      {!!label && (
        <label className="text-sm font-medium text-gray-500" htmlFor={props?.id}>{label}</label>
      )}
      <textarea {...props} className={clsx("resize-y p-4 rounded-md border border-gray-300 focus:border-primary transition-color !outline-none", className)} />
    </div>
  )
}