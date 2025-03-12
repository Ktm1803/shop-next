import { BarChart3, Box, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

export function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-card border-r p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Box className="h-6 w-6" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>
      <nav className="space-y-1">
        <Link href="/admin" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        <Link href="/admin/products" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <Package className="h-5 w-5" />
          <span>Products</span>
        </Link>
        <Link href="/admin/orders" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <ShoppingCart className="h-5 w-5" />
          <span>Orders</span>
        </Link>
        <Link href="/admin/customers" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <Users className="h-5 w-5" />
          <span>Customers</span>
        </Link>
        <Link href="/admin/analytics" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <BarChart3 className="h-5 w-5" />
          <span>Analytics</span>
        </Link>
        <Link href="/admin/settings" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-accent">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

