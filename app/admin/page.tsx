import { AdminDashboard } from "@/components/admin/dashboard"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </div>
  )
}

