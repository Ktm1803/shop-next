"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export function PromotionBanner() {
  return (
    <div className="my-12 w-full max-w-[1920px] mx-auto">
      <div className="bg-primary/10 rounded-lg p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Special Offer: 20% Off All Electronics</h2>
            <p className="text-lg mb-6 max-w-xl">
              Limited time offer on our most popular electronics. Use code <span className="font-bold">TECH20</span> at
              checkout.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg">
                <Link href="/products?category=electronics">Shop Now</Link>
              </Button>
            </motion.div>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"
                alt="Headphones on sale"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 md:opacity-40">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              fill="currentColor"
              d="M45.3,-51.2C58.3,-40.9,68.5,-25.9,71.8,-9.2C75.2,7.5,71.7,25.9,61.4,38.5C51.1,51.1,34,57.9,15.9,62.3C-2.2,66.7,-21.3,68.7,-36.9,61.9C-52.5,55.1,-64.5,39.5,-69.8,21.8C-75.1,4.1,-73.6,-15.7,-64.7,-30.7C-55.8,-45.7,-39.5,-55.9,-23.4,-65C-7.3,-74.1,8.6,-82.1,23.2,-77.5C37.8,-72.9,51.1,-55.7,45.3,-51.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

