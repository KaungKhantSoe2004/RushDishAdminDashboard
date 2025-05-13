import type { ReactNode, ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "success"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  fullWidth?: boolean
  className?: string
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: "bg-rose-500 hover:bg-rose-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    outline: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
  }

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-md 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      {...props}
    >
      {icon && <span className={`${children ? "mr-2" : ""}`}>{icon}</span>}
      {children}
    </button>
  )
}

export default Button
