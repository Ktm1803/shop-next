"use client"

import { useCart } from "@/hooks/use-cart"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function CartBadge() {
  const { totalItems } = useCart()
  const [displayCount, setDisplayCount] = useState(0)

  // Sử dụng useEffect để cập nhật displayCount khi totalItems thay đổi
  useEffect(() => {
    setDisplayCount(totalItems || 0)
  }, [totalItems])

  // Không hiển thị badge nếu không có sản phẩm
  if (!displayCount || displayCount <= 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
      >
        {displayCount > 99 ? "99+" : displayCount}
      </motion.div>
    </AnimatePresence>
  )
}

