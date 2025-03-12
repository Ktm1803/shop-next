"use client"

import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { PromotionBanner } from "@/components/promotion-banner"
import { NewArrivals } from "@/components/new-arrivals"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { NotificationToast } from "@/components/notification-toast"
import { useAuth } from "@/hooks/use-auth"

// Hiệu ứng cho các phần tử con
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function Home() {
  const [showPromoNotification, setShowPromoNotification] = useState(false)
  const { user } = useAuth()

  // Show promotion notification after a delay
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setShowPromoNotification(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [user])

  return (
    <>
      <motion.div className="w-full px-4 py-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <HeroSection />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FeaturedCategories />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PromotionBanner />
        </motion.div>

        <motion.div variants={itemVariants}>
          <NewArrivals />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProductGrid />
        </motion.div>
      </motion.div>

      {showPromoNotification && (
        <NotificationToast
          title="Flash Sale Alert!"
          message="Limited time offer: 30% off on all electronics. Valid for the next 24 hours only!"
          onClose={() => setShowPromoNotification(false)}
        />
      )}
    </>
  )
}

