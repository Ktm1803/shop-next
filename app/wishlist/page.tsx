"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWishlist, type WishlistItem } from "@/hooks/use-wishlist"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Heart, Loader2, ShoppingBag, ShoppingCart, Trash2, LogIn, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/hooks/use-cart"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, isEmpty, isLoading } = useWishlist()
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addItem: addToCart } = useCart()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState<string | null>(null)

  // Handle adding item to cart
  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.discount ? item.price * (1 - item.discount / 100) : item.price,
      image: item.image,
      quantity: 1,
    })
  }

  // Handle removing item from wishlist
  const handleRemoveItem = (id: string) => {
    setItemToRemove(id)
    setIsConfirmOpen(true)
  }

  // Confirm removal
  const confirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove)
      setItemToRemove(null)
    }
    setIsConfirmOpen(false)
  }

  // Handle clearing wishlist
  const handleClearWishlist = () => {
    setItemToRemove(null)
    setIsConfirmOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>{t("wishlist.loading")}</span>
      </div>
    )
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <LogIn className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-3xl font-bold">{t("wishlist.login_required")}</h1>
          <p className="mt-2 text-muted-foreground">{t("wishlist.login_message")}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/login?redirectTo=/wishlist">
                <LogIn className="mr-2 h-4 w-4" />
                {t("cart.login_now")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Show empty wishlist message if wishlist is empty
  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-bold">{t("wishlist.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("wishlist.empty_message")}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("wishlist.browse_products")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("wishlist.continue_shopping")}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t("wishlist.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("wishlist.item_count", { count: items.length })}</p>
        </div>
        <Button variant="outline" onClick={handleClearWishlist} className="flex items-center">
          <Trash2 className="mr-2 h-4 w-4" />
          {t("wishlist.clear")}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg?height=400&width=400"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </Link>
                  {item.discount && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      {item.discount}% OFF
                    </Badge>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 left-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="flex-grow p-4">
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    <h3 className="font-medium line-clamp-2">{item.name}</h3>
                  </Link>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-muted-foreground">({item.rating})</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {item.discount ? (
                      <>
                        <span className="text-lg font-bold">
                          ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${item.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <span>{item.brand}</span>
                    <span className="mx-1">•</span>
                    <span>{item.category}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t("product.add_to_cart")}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {itemToRemove ? t("wishlist.confirm_remove") : t("wishlist.confirm_clear")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {itemToRemove ? t("wishlist.confirm_remove_message") : t("wishlist.confirm_clear_message")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove}>
              {itemToRemove ? t("wishlist.remove") : t("wishlist.clear_all")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

