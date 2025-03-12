"use client"

import { useLanguage } from "@/hooks/use-language"
import { Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function TranslationLoading() {
  const { isTranslating } = useLanguage()

  return (
    <AnimatePresence>
      {isTranslating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 z-50"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Đang dịch nội dung...</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

