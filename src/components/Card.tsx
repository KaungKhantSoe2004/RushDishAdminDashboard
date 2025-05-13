import type { ReactNode } from "react"

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  icon?: ReactNode
}

const Card = ({ title, subtitle, children, className = "", icon }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

export default Card
