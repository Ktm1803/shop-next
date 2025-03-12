"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CheckoutSummaryProps {
  shippingCost?: number
}

export function CheckoutSummary({ shippingCost = 0 }: CheckoutSummaryProps) {
  const { items, subtotal } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const { t } = useLanguage()

  // Fixed tax rate
  const taxRate = 0.07 // 7%
  const taxAmount = (subtotal - discount) * taxRate

  // Calculate total
  const total = subtotal + (shippingCost || 0) + taxAmount - discount

  // Handle applying coupon code
  const handleApplyCoupon = useCallback(() => {
    if (!couponCode.trim() || !user) return

    setIsApplying(true)
    setPromoError(false)
    setPromoApplied(false)

    // Simulate API call delay
    setTimeout(() => {
      // Demo coupon codes
      if (couponCode.toUpperCase() === "SAVE10") {
        setDiscount(subtotal * 0.1)
        setPromoApplied(true)

        toast({
          title: t("checkout.coupon_applied"),
          description: t("checkout.coupon_applied_description", { discount: "10%" }),
        })
      } else if (couponCode.toUpperCase() === "SAVE20") {
        setDiscount(subtotal * 0.2)
        setPromoApplied(true)

        toast({
          title: t("checkout.coupon_applied"),
          description: t("checkout.coupon_applied_description", { discount: "20%" }),
        })
      } else {
        setPromoError(true)

        toast({
          title: t("checkout.invalid_coupon"),
          description: t("checkout.invalid_coupon_description"),
          variant: "destructive",
        })
      }

      setIsApplying(false)
    }, 1000)
  }, [couponCode, user, subtotal, toast, t])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("checkout.order_summary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items &&
            items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity} × {item.name.length > 25 ? `${item.name.substring(0, 25)}...` : item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                {t("cart.discount")} ({((discount / subtotal) * 100).toFixed(0)}%)
              </span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("cart.shipping")}</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("cart.tax")} (7%)</span>
            <span>${taxAmount.toFixed(2)}</span>
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

          {promoError && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{t("checkout.invalid_coupon_description")}</AlertDescription>
            </Alert>
          )}

          {promoApplied && (
            <Alert className="bg-green-50 text-green-800 border-green-200 mt-2">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {t("checkout.coupon_applied_description", { discount: `${((discount / subtotal) * 100).toFixed(0)}%` })}
              </AlertDescription>
            </Alert>
          )}

          <p className="text-xs text-muted-foreground mt-2">{t("cart.try_codes")}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-xs text-muted-foreground">
          <p>{t("checkout.secure_checkout")}</p>
          <p>{t("cart.free_shipping")} ($100+)</p>
          <p>{t("cart.return_policy")}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

