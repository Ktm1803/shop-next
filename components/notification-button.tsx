"use client"

import { useState } from "react"
import { Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export function NotificationButton() {
  const [open, setOpen] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [promotionsEnabled, setPromotionsEnabled] = useState(false)
  const [stockAlertsEnabled, setStockAlertsEnabled] = useState(false)
  const [priceDropsEnabled, setPriceDropsEnabled] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()

  const handleOpenChange = (newOpen: boolean) => {
    if (!user && newOpen) {
      // Redirect to login if user tries to open dialog without being logged in
      router.push("/login?redirectTo=" + encodeURIComponent(window.location.pathname))
      return
    }
    setOpen(newOpen)
  }

  const handleSavePreferences = () => {
    setIsSubscribing(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false)
      setOpen(false)

      if (promotionsEnabled || stockAlertsEnabled || priceDropsEnabled) {
        setNotificationsEnabled(true)
        toast({
          title: t("notifications.preferences_saved"),
          description: t("notifications.preferences_saved_message"),
        })
      } else {
        setNotificationsEnabled(false)
        toast({
          title: t("notifications.notifications_disabled"),
          description: t("notifications.notifications_disabled_message"),
        })
      }
    }, 1000)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10 relative"
        onClick={() => handleOpenChange(true)}
      >
        {notificationsEnabled ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {Math.floor(Math.random() * 5) + 1}
            </span>
          </motion.div>
        ) : (
          <BellOff className="h-5 w-5" />
        )}
        <span className="sr-only">{t("notifications.notifications")}</span>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("notifications.notification_preferences")}</DialogTitle>
            <DialogDescription>{t("notifications.notification_description")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">{t("notifications.promotions_and_deals")}</Label>
                <p className="text-sm text-muted-foreground">{t("notifications.promotions_description")}</p>
              </div>
              <Switch id="promotions" checked={promotionsEnabled} onCheckedChange={setPromotionsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="stock-alerts">{t("notifications.stock_alerts")}</Label>
                <p className="text-sm text-muted-foreground">{t("notifications.stock_alerts_description")}</p>
              </div>
              <Switch id="stock-alerts" checked={stockAlertsEnabled} onCheckedChange={setStockAlertsEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="price-drops">{t("notifications.price_drops")}</Label>
                <p className="text-sm text-muted-foreground">{t("notifications.price_drops_description")}</p>
              </div>
              <Switch id="price-drops" checked={priceDropsEnabled} onCheckedChange={setPriceDropsEnabled} />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSavePreferences} disabled={isSubscribing}>
              {isSubscribing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("common.saving")}
                </>
              ) : (
                t("notifications.save_preferences")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

