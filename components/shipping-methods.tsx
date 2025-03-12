"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/hooks/use-language"
import type { ShippingMethod } from "@/app/checkout/page"
import { Loader2, Truck, Clock, Zap } from "lucide-react"

interface ShippingMethodsProps {
  onSelect: (method: ShippingMethod) => void
  onBack: () => void
}

// Shipping methods data
const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 5-7 business days",
    price: 5.99,
    estimatedDelivery: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 12.99,
    estimatedDelivery: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Delivery by tomorrow",
    price: 24.99,
    estimatedDelivery: "Next business day",
  },
]

export function ShippingMethods({ onSelect, onBack }: ShippingMethodsProps) {
  const { t } = useLanguage()
  const [selectedMethod, setSelectedMethod] = useState<string>("standard")
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
    setIsLoading(true)

    // Find the selected shipping method
    const method = shippingMethods.find((m) => m.id === selectedMethod)

    if (method) {
      // Simulate API call
      setTimeout(() => {
        onSelect(method)
        setIsLoading(false)
      }, 800)
    }
  }

  // Get shipping method icon
  const getMethodIcon = (id: string) => {
    switch (id) {
      case "standard":
        return <Truck className="h-5 w-5 text-muted-foreground" />
      case "express":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "overnight":
        return <Zap className="h-5 w-5 text-amber-500" />
      default:
        return <Truck className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-start space-x-3 rounded-md border p-4 transition-colors ${
              selectedMethod === method.id ? "border-primary bg-primary/5" : ""
            }`}
          >
            <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
            <div className="flex-1 space-y-1">
              <Label htmlFor={method.id} className="flex items-center font-medium cursor-pointer">
                {getMethodIcon(method.id)}
                <span className="ml-2">{method.name}</span>
                <span className="ml-auto font-bold">${method.price.toFixed(2)}</span>
              </Label>
              <p className="text-sm text-muted-foreground">{method.description}</p>
              <p className="text-xs text-muted-foreground">
                {t("checkout.estimated_delivery")}: {method.estimatedDelivery}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          {t("checkout.back_information")}
        </Button>

        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("common.loading")}
            </>
          ) : (
            t("checkout.continue_payment")
          )}
        </Button>
      </div>
    </div>
  )
}

