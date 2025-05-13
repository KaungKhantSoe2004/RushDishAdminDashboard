"use client"

import { type ReactNode, useState } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

interface LayoutProps {
  children: ReactNode
  userRole: "admin" | "store" | "delivery"
  onRoleChange: (role: "admin" | "store" | "delivery") => void
}

const Layout = ({ children, userRole, onRoleChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} userRole={userRole} onRoleChange={onRoleChange} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default Layout
