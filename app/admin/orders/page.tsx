import { AdminOrderList } from "@/components/admin/order-list"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminOrdersPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        <AdminOrderList />
      </div>
    </div>
  )
}

