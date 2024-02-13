import { ComponentProps } from "react"
import { clsx } from "clsx"

type ButtonProps = ComponentProps<"button">

export const Button = ({ className, children, ...props}: ButtonProps) => {
  return (
    <button {...props} className={clsx("bg-primary hover:bg-primary-400 transition-colors !outline-none flex items-center justify-center h-10 px-4 rounded-md text-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", className)}>
      {children}
    </button>
  )
}