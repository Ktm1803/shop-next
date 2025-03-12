"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutSummary } from "@/components/checkout-summary"
import { PaymentMethods } from "@/components/payment-methods"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { Steps } from "@/components/steps"
import { useLanguage } from "@/hooks/use-language"
import { ShippingMethods } from "@/components/shipping-methods"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

// Define checkout steps
const steps = [
  { id: "information", name: "Information" },
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
]

// Define customer information type
export type CustomerInfo = {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  saveInfo: boolean
}

// Define shipping method type
export type ShippingMethod = {
  id: string
  name: string
  description: string
  price: number
  estimatedDelivery: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("information")
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const { items, isEmpty, clearCart, subtotal } = useCart()
  const router = useRouter()
  const { t } = useLanguage()
  const { toast } = useToast()
  const { user } = useAuth()

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (isEmpty && currentStep !== "confirmation") {
      router.push("/cart")
    }
  }, [isEmpty, router, currentStep])

  // If user is not logged in, redirect to login
  useEffect(() => {
    if (!user && currentStep !== "confirmation") {
      router.push("/login?redirectTo=/checkout")
    }
  }, [user, router, currentStep])

  // Handle customer information submission
  const handleInfoSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info)
    setCurrentStep("shipping")

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle shipping method selection
  const handleShippingSubmit = (method: ShippingMethod) => {
    setSelectedShippingMethod(method)
    setCurrentStep("payment")

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle payment submission
  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method)
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Generate random order ID
      const newOrderId = `ORD-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`
      setOrderId(newOrderId)

      // Clear cart after successful order
      clearCart()

      // Show success toast
      toast({
        title: t("checkout.order_success"),
        description: t("checkout.order_success_message", { orderId: newOrderId }),
      })

      setIsProcessing(false)
      setCurrentStep("confirmation")

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 2000)
  }

  // If cart is empty and not on confirmation step, show loading
  if (isEmpty && currentStep !== "confirmation") {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>{t("checkout.loading")}</span>
      </div>
    )
  }

  // Translated steps
  const translatedSteps = [
    { id: "information", name: t("checkout.information") },
    { id: "shipping", name: t("checkout.shipping") },
    { id: "payment", name: t("checkout.payment") },
    { id: "confirmation", name: t("checkout.confirmation") },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("checkout.title")}</h1>

      {/* Only show steps if not on confirmation */}
      {currentStep !== "confirmation" && <Steps steps={translatedSteps} currentStep={currentStep} />}

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full lg:w-2/3">
          {/* Information Step */}
          {currentStep === "information" && <CheckoutForm onComplete={handleInfoSubmit} />}

          {/* Shipping Step */}
          {currentStep === "shipping" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t("checkout.shipping_method")}</h2>
              <ShippingMethods onSelect={handleShippingSubmit} onBack={() => setCurrentStep("information")} />
            </div>
          )}

          {/* Payment Step */}
          {currentStep === "payment" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t("checkout.payment")}</h2>
              <PaymentMethods
                onComplete={handlePaymentSubmit}
                onBack={() => setCurrentStep("shipping")}
                isProcessing={isProcessing}
              />
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === "confirmation" && (
            <motion.div
              className="text-center py-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold">{t("checkout.order_complete")}</h2>

              <p className="text-lg">
                {t("checkout.order_number")}: <span className="font-bold">{orderId}</span>
              </p>

              <p className="text-muted-foreground max-w-md mx-auto">{t("checkout.confirmation_message")}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild>
                  <Link href="/orders">{t("checkout.view_order")}</Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href="/products">{t("checkout.continue_shopping")}</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="w-full lg:w-1/3">
          {currentStep !== "confirmation" ? (
            <CheckoutSummary shippingCost={selectedShippingMethod?.price} />
          ) : (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{t("checkout.order_summary")}</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{t("cart.subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {selectedShippingMethod && (
                  <div className="flex justify-between text-sm">
                    <span>{t("cart.shipping")}</span>
                    <span>${selectedShippingMethod.price.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>{t("cart.total")}</span>
                    <span>${(subtotal + (selectedShippingMethod?.price || 0)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>{t("checkout.confirmation_email")}</p>
                <p>{customerInfo?.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

