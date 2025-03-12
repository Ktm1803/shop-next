"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/hooks/use-auth"
import type { CustomerInfo } from "@/app/checkout/page"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"

// Countries data
const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "br", label: "Brazil" },
  { value: "vn", label: "Vietnam" },
]

// US States
const usStates = [
  { value: "al", label: "Alabama" },
  { value: "ak", label: "Alaska" },
  { value: "az", label: "Arizona" },
  { value: "ar", label: "Arkansas" },
  { value: "ca", label: "California" },
  { value: "co", label: "Colorado" },
  { value: "ct", label: "Connecticut" },
  { value: "de", label: "Delaware" },
  { value: "fl", label: "Florida" },
  { value: "ga", label: "Georgia" },
  { value: "hi", label: "Hawaii" },
  { value: "id", label: "Idaho" },
  { value: "il", label: "Illinois" },
  { value: "in", label: "Indiana" },
  { value: "ia", label: "Iowa" },
  { value: "ks", label: "Kansas" },
  { value: "ky", label: "Kentucky" },
  { value: "la", label: "Louisiana" },
  { value: "me", label: "Maine" },
  { value: "md", label: "Maryland" },
  { value: "ma", label: "Massachusetts" },
  { value: "mi", label: "Michigan" },
  { value: "mn", label: "Minnesota" },
  { value: "ms", label: "Mississippi" },
  { value: "mo", label: "Missouri" },
  { value: "mt", label: "Montana" },
  { value: "ne", label: "Nebraska" },
  { value: "nv", label: "Nevada" },
  { value: "nh", label: "New Hampshire" },
  { value: "nj", label: "New Jersey" },
  { value: "nm", label: "New Mexico" },
  { value: "ny", label: "New York" },
  { value: "nc", label: "North Carolina" },
  { value: "nd", label: "North Dakota" },
  { value: "oh", label: "Ohio" },
  { value: "ok", label: "Oklahoma" },
  { value: "or", label: "Oregon" },
  { value: "pa", label: "Pennsylvania" },
  { value: "ri", label: "Rhode Island" },
  { value: "sc", label: "South Carolina" },
  { value: "sd", label: "South Dakota" },
  { value: "tn", label: "Tennessee" },
  { value: "tx", label: "Texas" },
  { value: "ut", label: "Utah" },
  { value: "vt", label: "Vermont" },
  { value: "va", label: "Virginia" },
  { value: "wa", label: "Washington" },
  { value: "wv", label: "West Virginia" },
  { value: "wi", label: "Wisconsin" },
  { value: "wy", label: "Wyoming" },
]

interface CheckoutFormProps {
  onComplete: (info: CustomerInfo) => void
}

export function CheckoutForm({ onComplete }: CheckoutFormProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Create form schema with Zod
  const formSchema = z.object({
    email: z.string().email(t("checkout.invalid_email")),
    firstName: z.string().min(2, t("checkout.invalid_first_name")),
    lastName: z.string().min(2, t("checkout.invalid_last_name")),
    address: z.string().min(5, t("checkout.invalid_address")),
    apartment: z.string().optional(),
    city: z.string().min(2, t("checkout.invalid_city")),
    state: z.string().min(1, t("checkout.invalid_state")),
    zipCode: z.string().min(4, t("checkout.invalid_zip")),
    country: z.string().min(1, t("checkout.invalid_country")),
    phone: z.string().min(7, t("checkout.invalid_phone")),
    saveInfo: z.boolean().default(true),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "us",
      phone: "",
      saveInfo: true,
    },
  })

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user?.address) {
      form.setValue("firstName", user.name.split(" ")[0] || "")
      form.setValue("lastName", user.name.split(" ").slice(1).join(" ") || "")
      form.setValue("address", user.address.street || "")
      form.setValue("city", user.address.city || "")
      form.setValue("state", user.address.state || "")
      form.setValue("zipCode", user.address.zipCode || "")
      form.setValue("country", user.address.country === "United States" ? "us" : "")
      form.setValue("phone", user.phone || "")
    }
  }, [user, form])

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Get country and state labels
      const countryLabel = countries.find((c) => c.value === values.country)?.label || values.country
      const stateLabel = usStates.find((s) => s.value === values.state)?.label || values.state

      // Create customer info object
      const customerInfo: CustomerInfo = {
        ...values,
        country: countryLabel,
        state: stateLabel,
      }

      // Call onComplete callback
      onComplete(customerInfo)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">{t("checkout.contact_information")}</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("checkout.email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("checkout.phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t("checkout.shipping_address")}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("checkout.first_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("checkout.last_name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("checkout.address")}</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("checkout.apartment")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Apt 4B (optional)" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("checkout.city")}</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("checkout.state")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("checkout.select_state")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("checkout.zip_code")}</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("checkout.country")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("checkout.select_country")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveInfo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("checkout.save_info")}</FormLabel>
                    <p className="text-sm text-muted-foreground">{t("checkout.save_info_description")}</p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("common.loading")}
            </>
          ) : (
            t("checkout.continue_shipping")
          )}
        </Button>
      </form>
    </Form>
  )
}

