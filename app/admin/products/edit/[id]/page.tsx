"use client"

import { AdminSidebar } from "@/components/admin/sidebar"
import { ProductForm } from "@/components/admin/product-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the product from an API
    // For this demo, we'll use localStorage
    const storedProducts = localStorage.getItem("adminProducts")
    if (storedProducts) {
      try {
        const products = JSON.parse(storedProducts)
        const foundProduct = products.find((p: any) => p.id === params.id)
        if (foundProduct) {
          setProduct(foundProduct)
        }
      } catch (error) {
        console.error("Error parsing stored products:", error)
      }
    }
    setLoading(false)
  }, [params.id])

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : product ? (
          <ProductForm existingProduct={product} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been deleted.
            </p>
            <Button asChild>
              <Link href="/admin/products">Back to Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

