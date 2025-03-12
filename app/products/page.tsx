"use client"

import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"
import { motion } from "framer-motion"

export default function ProductsPage() {
  return (
    <div className="w-full px-4 py-8 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          className="w-full md:w-1/4 lg:w-1/5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductFilters />
        </motion.div>
        <motion.div
          className="w-full md:w-3/4 lg:w-4/5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          <Suspense fallback={<ProductsLoading />}>
            <ProductGrid />
          </Suspense>
        </motion.div>
      </div>
    </div>
  )
}

