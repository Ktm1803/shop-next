"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useState, useCallback, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
// Thay đổi các chuỗi cứng thành các khóa dịch
import { useLanguage } from "@/hooks/use-language"

export function CartSummary() {
  const { subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [discount, setDiscount] = useState(0)
  const { toast } = useToast()
  const { user } = useAuth()
  const { t } = useLanguage() // Thêm hook useLanguage

  // References for toast messages
  const couponAppliedRef = useRef<{ code: string; discount: number } | null>(null)
  const couponInvalidRef = useRef(false)

  // Fixed shipping and tax rates for demo
  const shipping = subtotal > 0 ? 9.99 : 0
  const taxRate = 0.1 // 10%
  const tax = subtotal * taxRate

  // Calculate total with discount
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal + shipping + tax - discountAmount

  // Handle toasts separately from state updates
  useEffect(() => {
    if (couponAppliedRef.current) {
      const { code, discount } = couponAppliedRef.current
      toast({
        title: "Coupon applied",
        description: `${discount}% discount has been applied to your order.`,
      })
      couponAppliedRef.current = null
    }

    if (couponInvalidRef.current) {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      })
      couponInvalidRef.current = false
    }
  }, [discount, toast])

  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim() || !user) return

    setIsApplying(true)

    // Simulate API call delay
    setTimeout(() => {
      // Demo coupon codes
      if (couponCode.toUpperCase() === "SAVE10") {
        setDiscount(10)
        couponAppliedRef.current = { code: couponCode, discount: 10 }
      } else if (couponCode.toUpperCase() === "SAVE20") {
        setDiscount(20)
        couponAppliedRef.current = { code: couponCode, discount: 20 }
      } else {
        couponInvalidRef.current = true
      }

      setIsApplying(false)
    }, 1000)
  }, [couponCode, user])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("cart.summary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                {t("cart.discount")} ({discount}%)
              </span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>{t("cart.shipping")}</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{t("cart.tax")}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between font-medium">
            <span>{t("cart.total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4">
          <Label htmlFor="coupon">{t("cart.promo_code")}</Label>
          <div className="flex mt-1">
            <Input
              id="coupon"
              placeholder={t("cart.promo_code")}
              className="rounded-r-none"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              disabled={isApplying}
            />
            <Button
              variant="secondary"
              className="rounded-l-none"
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isApplying}
            >
              {isApplying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                t("cart.apply")
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{t("cart.try_codes")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link href="/checkout">{t("cart.checkout")}</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={clearCart}>
          {t("cart.clear")}
        </Button>
      </CardFooter>
    </Card>
  )
}

