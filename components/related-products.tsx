"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"

// Mock data - in a real app, this would come from an API
const allProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 15,
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
  },
  {
    id: "4",
    name: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: 229.95,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    discount: 20,
  },
  {
    id: "6",
    name: "JBL Flip 5 Waterproof Portable Bluetooth Speaker",
    price: 119.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: "7",
    name: "PlayStation 5 Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: "8",
    name: "Logitech MX Master 3 Wireless Mouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 5,
  },
  {
    id: "21",
    name: "Apple AirPods Max",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1625245488600-f03fef636ebb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: "22",
    name: "Samsung 55-inch QLED 4K Smart TV",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
  },
  {
    id: "23",
    name: "Bose QuietComfort Earbuds II",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
  },
  {
    id: "24",
    name: "GoPro HERO11 Black",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
  },
]

// Mapping of product IDs to related product IDs
const relatedProductsMap: Record<string, string[]> = {
  "1": ["5", "6", "8", "23"],
  "2": ["3", "7", "22"],
  "3": ["2", "7", "8", "21"],
  "4": ["5", "8", "23"],
  "5": ["1", "4", "6", "23"],
  "6": ["1", "5", "23"],
  "7": ["2", "3", "22", "24"],
  "8": ["1", "3", "4", "21"],
  "9": ["10", "11", "12"],
  "10": ["9", "11", "12"],
  "11": ["9", "10", "12"],
  "12": ["9", "10", "11"],
  "13": ["14", "15", "16"],
  "14": ["13", "15", "16"],
  "15": ["13", "14", "16"],
  "16": ["13", "14", "15"],
  "17": ["18", "19", "20"],
  "18": ["17", "19", "20"],
  "19": ["17", "18", "20"],
  "20": ["17", "18", "19"],
  "21": ["1", "3", "8", "23"],
  "22": ["2", "7", "24"],
  "23": ["1", "5", "6", "21"],
  "24": ["7", "22", "23"],
}

// Update related products to properly link and display
export function RelatedProducts({ productId }: { productId: string }) {
  const [relatedProducts, setRelatedProducts] = useState<typeof allProducts>([])

  useEffect(() => {
    // In a real app, you would fetch related products from an API
    // For this demo, we'll use the mock data
    const relatedIds = relatedProductsMap[productId] || []

    // If no related products are defined for this ID, show some random products
    if (relatedIds.length === 0) {
      // Get 4 random products excluding the current one
      const randomProducts = allProducts
        .filter((p) => p.id !== productId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)

      setRelatedProducts(randomProducts)
    } else {
      const related = allProducts.filter((product) => relatedIds.includes(product.id))
      setRelatedProducts(related)
    }
  }, [productId])

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

