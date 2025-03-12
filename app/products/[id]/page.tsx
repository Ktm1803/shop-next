import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { ProductReviews } from "@/components/product-reviews"
import { Suspense } from "react"
import { ProductDetailsLoading } from "@/components/product-details-loading"
import type { Metadata } from "next"

type Props = {
  params: { id: string }
}

// In a real app, you would fetch this data server-side
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  // This would be a server-side data fetch in a real app
  return {
    title: `Product Details - ID: ${id}`,
    description: "View detailed product information, specifications, and reviews.",
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsLoading />}>
        <ProductDetails id={params.id} />
      </Suspense>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Product Reviews</h2>
        <ProductReviews productId={params.id} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts productId={params.id} />
      </div>
    </div>
  )
}

