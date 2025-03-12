"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop",
    count: 120,
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop",
    count: 250,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-bda9f7f6b548?q=80&w=1000&auto=format&fit=crop",
    count: 180,
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
    count: 95,
  },
]

export function FeaturedCategories() {
  return (
    <div className="py-12 w-full max-w-[1920px] mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div key={category.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href={`/products?category=${category.id}`} className="group">
              <div className="relative overflow-hidden rounded-lg bg-muted transition-all hover:shadow-md">
                <div className="aspect-square">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} products</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

