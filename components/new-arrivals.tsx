import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// Mock data for new arrivals
const newArrivals = [
  {
    id: "21",
    name: "Apple AirPods Max",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1625245488600-f03fef636ebb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    description:
      "High-fidelity audio, Active Noise Cancellation, and spatial audio with dynamic head tracking for immersive sound.",
    brand: "Apple",
    category: "Electronics",
    stock: 15,
  },
  {
    id: "22",
    name: "Samsung 55-inch QLED 4K Smart TV",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
    description:
      "Quantum Dot technology delivers 100% color volume with over a billion shades. Smart TV with built-in voice assistants.",
    brand: "Samsung",
    category: "Electronics",
    stock: 20,
  },
  {
    id: "23",
    name: "Bose QuietComfort Earbuds II",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Wireless noise cancelling earbuds with personalized noise cancellation and sound. Up to 6 hours of battery life.",
    brand: "Bose",
    category: "Electronics",
    stock: 25,
  },
  {
    id: "24",
    name: "GoPro HERO11 Black",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    description: "Waterproof action camera with 5.3K video, 27MP photos, and HyperSmooth 5.0 video stabilization.",
    brand: "GoPro",
    category: "Electronics",
    stock: 18,
  },
]

export function NewArrivals() {
  return (
    <div className="py-12 w-full max-w-[1920px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <Button variant="ghost" asChild className="gap-1">
          <Link href="/products?sort=newest">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

