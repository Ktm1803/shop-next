"use client"

import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, ArrowLeft, LogIn, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"
// Thay đổi các chuỗi cứng thành các khóa dịch
import { useLanguage } from "@/hooks/use-language"

export default function CartPage() {
  const { items, isEmpty, isLoggedIn } = useCart()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage() // Thêm hook useLanguage

  // Add a small delay to ensure cart is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>{t("cart.loading")}</span>
      </div>
    )
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <LogIn className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-6 text-3xl font-bold">{t("cart.login_required")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cart.login_message")}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/login?redirectTo=/cart">
                <LogIn className="mr-2 h-4 w-4" />
                {t("cart.login_now")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Show empty cart message if cart is empty
  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 text-3xl font-bold">{t("cart.empty")}</h1>
          <p className="mt-2 text-muted-foreground">{t("cart.empty_message")}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href="/products">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("cart.browse_products")}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("cart.continue_shopping")}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{t("cart.title")}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CartItem key={item.id} item={item} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

