"use client"

import type { MouseEvent } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { useCart } from "@/hooks/use-cart"
import { useCallback, useRef } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useWishlist } from "@/hooks/use-wishlist"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    rating: number
    discount?: number
    category?: string
    brand?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  // Use refs to track actions instead of directly calling toast
  const wishlistActionRef = useRef(false)

  const handleAddToCart = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (!user) {
        const currentPath = window.location.pathname
        router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
        return
      }

      addItem({
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: product.image,
        quantity: 1,
      })

      // Hiển thị toast thông báo
      toast({
        title: t("common.added_to_cart"),
        description: `${product.name} ${t("common.added_to_cart").toLowerCase()}`,
      })
    },
    [addItem, discountedPrice, product.id, product.image, product.name, user, router, toast, t],
  )

  const handleToggleWishlist = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (!user) {
        const currentPath = window.location.pathname
        router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
        return
      }

      wishlistActionRef.current = true

      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
          discount: product.discount,
          category: product.category || "Unknown",
          brand: product.brand || "Unknown",
        })
      }
    },
    [user, router, isInWishlist, product, removeFromWishlist, addToWishlist],
  )

  const isWishlisted = isInWishlist(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/products/${product.id}`} className="block group">
        <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg border-transparent hover:border-primary/20">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {product.discount && (
              <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                {product.discount}% OFF
              </div>
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant={isWishlisted ? "destructive" : "ghost"}
                className={`absolute top-2 left-2 h-8 w-8 rounded-full ${
                  isWishlisted
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                }`}
                onClick={handleToggleWishlist}
              >
                <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
                <span className="sr-only">
                  {isWishlisted ? t("wishlist.remove_from_wishlist") : t("product.add_to_wishlist")}
                </span>
              </Button>
            </motion.div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-muted-foreground">({product.rating})</span>
            </div>
            <div className="mt-2 flex items-center">
              {product.discount ? (
                <>
                  <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
              <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("product.add_to_cart")}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

