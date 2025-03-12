"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

// Mock product data - in a real app, this would come from an API
const allProducts = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 15,
    category: "Electronics",
    brand: "Sony",
    tags: ["headphones", "wireless", "noise-cancelling", "bluetooth"],
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    category: "Electronics",
    brand: "Samsung",
    tags: ["smartphone", "5g", "camera", "android"],
  },
  {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
    category: "Electronics",
    brand: "Apple",
    tags: ["laptop", "macbook", "apple", "m1"],
  },
  {
    id: "4",
    name: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: 229.95,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    category: "Electronics",
    brand: "Fitbit",
    tags: ["smartwatch", "fitness", "health", "wearable"],
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    discount: 20,
    category: "Electronics",
    brand: "Anker",
    tags: ["charger", "wireless", "qi", "accessories"],
  },
  {
    id: "6",
    name: "JBL Flip 5 Waterproof Portable Bluetooth Speaker",
    price: 119.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    category: "Electronics",
    brand: "JBL",
    tags: ["speaker", "bluetooth", "waterproof", "portable"],
  },
  {
    id: "7",
    name: "PlayStation 5 Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    category: "Electronics",
    brand: "Sony",
    tags: ["gaming", "console", "playstation", "entertainment"],
  },
  {
    id: "8",
    name: "Logitech MX Master 3 Wireless Mouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 5,
    category: "Electronics",
    brand: "Logitech",
    tags: ["mouse", "wireless", "ergonomic", "accessories"],
  },
  {
    id: "101",
    name: 'LG OLED C1 Series 55" 4K Smart TV',
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 10,
    category: "Electronics",
    brand: "LG",
    tags: ["tv", "oled", "4k", "smart tv"],
  },
  {
    id: "102",
    name: "Apple AirPods Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    category: "Electronics",
    brand: "Apple",
    tags: ["earbuds", "wireless", "noise-cancelling", "apple"],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof allProducts>([])

  // Perform search when query changes
  useEffect(() => {
    setSearchQuery(query)

    if (query) {
      setIsSearching(true)

      // Simulate API delay
      const timer = setTimeout(() => {
        const results = allProducts.filter((product) => {
          const searchTerms = query.toLowerCase().split(" ")

          // Check if any search term is in the product name, brand, category, or tags
          return searchTerms.some(
            (term) =>
              product.name.toLowerCase().includes(term) ||
              product.brand.toLowerCase().includes(term) ||
              product.category.toLowerCase().includes(term) ||
              product.tags.some((tag) => tag.toLowerCase().includes(term)),
          )
        })

        setSearchResults(results)
        setIsSearching(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [query])

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search query
    const url = new URL(window.location.href)
    url.searchParams.set("q", searchQuery)
    window.history.pushState({}, "", url.toString())

    // Trigger search
    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const results = allProducts.filter((product) => {
        const searchTerms = searchQuery.toLowerCase().split(" ")

        // Check if any search term is in the product name, brand, category, or tags
        return searchTerms.some(
          (term) =>
            product.name.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.tags.some((tag) => tag.toLowerCase().includes(term)),
        )
      })

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Products</h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2">
          <Input
            type="search"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
            {isSearching ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>
        <div className="w-full md:w-3/4">
          {isSearching ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Found {searchResults.length} results for "{query}"
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : query ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find any products matching "{query}"</p>
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2">Suggestions:</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>Check your spelling</li>
                  <li>Try more general keywords</li>
                  <li>Try different keywords</li>
                  <li>Browse our categories</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-2">Search for products</h2>
              <p className="text-muted-foreground">Enter a search term to find products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

