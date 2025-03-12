"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-primary/80 to-primary/40 text-white">
        <div className="w-full px-6 py-16 md:py-24 flex flex-col md:flex-row items-center max-w-[1920px] mx-auto">
          <motion.div
            className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Latest Trends</h1>
            <p className="text-lg md:text-xl mb-8 max-w-md">
              Discover our new collection with amazing deals and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/products">Shop Now</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/products?sale=true">View Deals</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop"
              alt="Hero Image"
              width={600}
              height={600}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>
    </div>
  )
}

