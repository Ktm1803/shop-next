"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

interface NotificationToastProps {
  title: string
  message: string
  duration?: number
  onClose?: () => void
}

export function NotificationToast({ title, message, duration = 5000, onClose }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) setTimeout(onClose, 300) // Allow animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm bg-card border shadow-lg rounded-lg overflow-hidden"
        >
          <div className="flex items-start p-4">
            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{message}</p>
              <div className="mt-3 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsVisible(false)
                    if (onClose) setTimeout(onClose, 300)
                  }}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    window.location.href = "/deals"
                  }}
                >
                  {t("nav.deals")}
                </Button>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-background rounded-md inline-flex text-muted-foreground hover:text-foreground focus:outline-none"
                onClick={() => {
                  setIsVisible(false)
                  if (onClose) setTimeout(onClose, 300)
                }}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            className="bg-primary h-1 animate-[shrink_5s_linear]"
            style={{ width: "100%", animation: `shrink ${duration}ms linear forwards` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

