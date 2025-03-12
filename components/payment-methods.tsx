"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, Landmark, Wallet, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

interface PaymentMethodsProps {
  onComplete: (method: string) => void
  onBack: () => void
  isProcessing: boolean
}

export function PaymentMethods({ onComplete, onBack, isProcessing }: PaymentMethodsProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardName, setCardName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Validate form if credit card is selected
    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
        alert(t("checkout.fill_all_fields"))
        setIsSubmitting(false)
        return
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      onComplete(paymentMethod)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
        <div className="flex items-start space-x-3 rounded-md border p-4">
          <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="credit-card" className="flex items-center font-medium">
                <CreditCard className="mr-2 h-5 w-5" />
                {t("checkout.credit_card")}
              </Label>
              <div className="flex space-x-1">
                <img src="/placeholder.svg?height=24&width=36" alt="Visa" className="h-6 w-auto" />
                <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" className="h-6 w-auto" />
                <img src="/placeholder.svg?height=24&width=36" alt="Amex" className="h-6 w-auto" />
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">{t("checkout.card_number")}</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      disabled={isSubmitting || isProcessing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="expiry">{t("checkout.expiry_date")}</Label>
                    <Input
                      id="expiry"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      disabled={isSubmitting || isProcessing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      disabled={isSubmitting || isProcessing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{t("checkout.name_on_card")}</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={isSubmitting || isProcessing}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3 rounded-md border p-4">
          <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="paypal" className="flex items-center font-medium">
              <Wallet className="mr-2 h-5 w-5" />
              PayPal
            </Label>
            <p className="text-sm text-muted-foreground mt-1">{t("checkout.paypal_description")}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 rounded-md border p-4">
          <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="bank-transfer" className="flex items-center font-medium">
              <Landmark className="mr-2 h-5 w-5" />
              {t("checkout.bank_transfer")}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">{t("checkout.bank_transfer_description")}</p>
          </div>
        </div>
      </RadioGroup>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="billing-address" className="font-medium">
          {t("checkout.billing_address")}
        </Label>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="same-address" className="h-4 w-4 rounded border-gray-300" defaultChecked />
          <Label htmlFor="same-address" className="text-sm font-normal">
            {t("checkout.same_as_shipping")}
          </Label>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting || isProcessing}>
          {t("checkout.back_shipping")}
        </Button>

        <Button onClick={handleSubmit} disabled={isSubmitting || isProcessing}>
          {isSubmitting || isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isProcessing ? t("checkout.processing") : t("common.loading")}
            </>
          ) : (
            t("checkout.complete_order")
          )}
        </Button>
      </div>
    </div>
  )
}

