"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/hooks/use-wishlist"
import { useQuery } from "react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

// Mock data - in a real app, this would come from an API
const products = {
  "1": {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 349.99,
    discount: 15,
    rating: 4.8,
    reviewCount: 1283,
    description:
      "Industry-leading noise cancellation with Dual Noise Sensor technology. Enjoy premium sound quality with 30-hour battery life and quick charging capabilities. Features touch sensor controls, speak-to-chat technology, and wearing detection for a seamless listening experience.",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life with quick charging",
      "Touch sensor controls",
      "Speak-to-chat technology",
      "Wearing detection for auto-play/pause",
      "Multipoint connection for multiple devices",
      "High-resolution audio wireless with LDAC",
    ],
    specifications: {
      Brand: "Sony",
      Model: "WH-1000XM4",
      Color: "Black",
      Connectivity: "Bluetooth 5.0, 3.5mm audio cable",
      Battery: "30 hours (NC ON), 38 hours (NC OFF)",
      Weight: "254g",
      "Frequency Response": "4Hz-40,000Hz",
      "Driver Size": "40mm",
      "Noise Cancellation": "Active Noise Cancellation",
    },
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 25,
    sku: "SONY-WH1000XM4-BLK",
    brand: "Sony",
    category: "Electronics",
    tags: ["headphones", "wireless", "noise-cancelling", "bluetooth"],
    relatedProducts: ["2", "5", "6", "8"],
  },
  "2": {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    rating: 4.9,
    reviewCount: 856,
    description:
      "Pro-grade camera with 108MP, 8K video, and 100x Space Zoom. 5G connectivity and all-day battery life. Experience the power of Samsung's most advanced smartphone.",
    features: [
      "108MP pro-grade camera",
      "8K video recording",
      "100x Space Zoom",
      "5G connectivity",
      "Dynamic AMOLED 2X display",
      "All-day battery life",
      "S Pen compatibility",
    ],
    specifications: {
      Brand: "Samsung",
      Model: "Galaxy S21 Ultra",
      Color: "Phantom Black",
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Exynos 2100 / Snapdragon 888",
      RAM: "12GB/16GB",
      Storage: "128GB/256GB/512GB",
      Battery: "5000mAh",
      "Operating System": "Android 11",
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 12,
    sku: "SAMSUNG-S21U-BLK",
    brand: "Samsung",
    category: "Electronics",
    tags: ["smartphone", "5g", "camera", "android"],
    relatedProducts: ["3", "7", "101", "102"],
  },
  "3": {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    discount: 10,
    rating: 4.7,
    reviewCount: 542,
    description:
      "Apple M1 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display, and up to 21 hours of battery life.",
    features: [
      "Apple M1 Pro chip",
      "16GB unified memory",
      "512GB SSD storage",
      "16-inch Liquid Retina XDR display",
      "Three Thunderbolt 4 ports",
      "HDMI port and SDXC card slot",
      "Magic Keyboard with Touch ID",
      "Up to 21 hours of battery life",
    ],
    specifications: {
      Brand: "Apple",
      Model: "MacBook Pro 16-inch",
      Processor: "Apple M1 Pro",
      RAM: "16GB",
      Storage: "512GB SSD",
      Display: "16-inch Liquid Retina XDR",
      Graphics: "16-core GPU",
      "Operating System": "macOS",
      Weight: "2.1kg",
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 8,
    sku: "APPLE-MBP16-M1P",
    brand: "Apple",
    category: "Electronics",
    tags: ["laptop", "macbook", "apple", "m1"],
    relatedProducts: ["2", "7", "8"],
  },
  "4": {
    id: "4",
    name: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: 229.95,
    rating: 4.5,
    reviewCount: 328,
    description:
      "Built-in GPS, heart rate monitoring, sleep tracking, and 6+ day battery life. Works with Amazon Alexa and Google Assistant.",
    features: [
      "Built-in GPS",
      "24/7 heart rate tracking",
      "Active Zone Minutes",
      "Sleep tracking & Sleep Score",
      "Voice assistant compatibility",
      "6+ days battery life",
      "Water resistant to 50m",
      "Store and play music",
    ],
    specifications: {
      Brand: "Fitbit",
      Model: "Versa 3",
      Display: "AMOLED",
      Sensors: "Heart rate, accelerometer, gyroscope, altimeter",
      Battery: "6+ days",
      Connectivity: "Bluetooth, Wi-Fi",
      Compatibility: "iOS & Android",
      "Water Resistance": "50m",
      Weight: "40g",
    },
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 30,
    sku: "FITBIT-VERSA3-BLK",
    brand: "Fitbit",
    category: "Electronics",
    tags: ["smartwatch", "fitness", "health", "wearable"],
    relatedProducts: ["5", "8"],
  },
  "5": {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    discount: 20,
    rating: 4.3,
    reviewCount: 215,
    description: "Fast wireless charging for Qi-enabled devices. Charges through most cases up to 5mm thick.",
    features: [
      "10W fast charging",
      "Universal compatibility with Qi devices",
      "Case-friendly design (up to 5mm)",
      "Temperature control",
      "Foreign object detection",
      "LED indicator",
      "Non-slip surface",
    ],
    specifications: {
      Brand: "Anker",
      Model: "PowerWave Pad",
      Input: "5V/2A, 9V/2A",
      Output: "10W max",
      Dimensions: "10.1 x 10.1 x 1.1 cm",
      Weight: "132g",
      "Cable Length": "1.2m",
      Compatibility: "Qi-enabled devices",
    },
    images: [
      "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659794542952-eed535e7b3c7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659794542952-eed535e7b3c7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659794542952-eed535e7b3c7?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 50,
    sku: "ANKER-PWPAD-BLK",
    brand: "Anker",
    category: "Electronics",
    tags: ["charger", "wireless", "qi", "accessories"],
    relatedProducts: ["1", "4", "6"],
  },
  "6": {
    id: "6",
    name: "JBL Flip 5 Waterproof Portable Bluetooth Speaker",
    price: 119.95,
    rating: 4.6,
    reviewCount: 478,
    description: "Waterproof IPX7 design, 12 hours of playtime, and PartyBoost for multiple speaker pairing.",
    features: [
      "Waterproof IPX7 design",
      "12 hours of playtime",
      "PartyBoost for multiple speaker pairing",
      "USB-C charging",
      "Durable fabric material",
      "Built-in noise and echo-cancelling speakerphone",
      "Available in multiple colors",
    ],
    specifications: {
      Brand: "JBL",
      Model: "Flip 5",
      Output: "20W RMS",
      Battery: "4800mAh",
      "Charging Time": "2.5 hours",
      Playtime: "12 hours",
      "Bluetooth Version": "4.2",
      "Waterproof Rating": "IPX7",
      Dimensions: "18.1 x 6.9 x 7.4 cm",
      Weight: "540g",
    },
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 35,
    sku: "JBL-FLIP5-BLK",
    brand: "JBL",
    category: "Electronics",
    tags: ["speaker", "bluetooth", "waterproof", "portable"],
    relatedProducts: ["1", "5"],
  },
  "7": {
    id: "7",
    name: "PlayStation 5 Console",
    price: 499.99,
    rating: 4.9,
    reviewCount: 1024,
    description:
      "Lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and breathtaking immersion with 3D audio.",
    features: [
      "Ultra-high speed SSD",
      "Ray tracing support",
      "4K-TV gaming at up to 120fps",
      "Haptic feedback",
      "Adaptive triggers",
      "Tempest 3D AudioTech",
      "Backward compatibility with PS4 games",
    ],
    specifications: {
      Brand: "Sony",
      Model: "PlayStation 5",
      CPU: "AMD Zen 2, 8 cores at 3.5GHz",
      GPU: "AMD RDNA 2, 10.28 TFLOPs",
      RAM: "16GB GDDR6",
      Storage: "825GB SSD",
      "Optical Drive": "4K UHD Blu-ray",
      Resolution: "Up to 8K",
      "Frame Rate": "Up to 120fps",
      Dimensions: "39 x 10.4 x 26 cm",
      Weight: "4.5kg",
    },
    images: [
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 5,
    sku: "SONY-PS5-DISC",
    brand: "Sony",
    category: "Electronics",
    tags: ["gaming", "console", "playstation", "entertainment"],
    relatedProducts: ["2", "3"],
  },
  "8": {
    id: "8",
    name: "Logitech MX Master 3 Wireless Mouse",
    price: 99.99,
    discount: 5,
    rating: 4.7,
    reviewCount: 356,
    description:
      "Ultra-fast scrolling, ergonomic design, and customizable buttons. Works on any surface, including glass.",
    features: [
      "MagSpeed electromagnetic scrolling",
      "Ergonomic design",
      "Customizable buttons",
      "Track on any surface, including glass",
      "USB-C quick charging",
      "Connect up to 3 devices",
      "App-specific customizations",
    ],
    specifications: {
      Brand: "Logitech",
      Model: "MX Master 3",
      Sensor: "Darkfield high precision",
      DPI: "200 to 4000",
      Buttons: "7",
      Battery: "Up to 70 days on full charge",
      Charging: "USB-C",
      Connectivity: "Bluetooth, Unifying USB receiver",
      Weight: "141g",
    },
    images: [
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 20,
    sku: "LOGITECH-MXM3-GRY",
    brand: "Logitech",
    category: "Electronics",
    tags: ["mouse", "wireless", "ergonomic", "accessories"],
    relatedProducts: ["1", "3", "4"],
  },
  "101": {
    id: "101",
    name: 'LG OLED C1 Series 55" 4K Smart TV',
    price: 1499.99,
    discount: 10,
    rating: 4.8,
    reviewCount: 423,
    description:
      "Self-lit OLED pixels, α9 Gen 4 AI Processor 4K, Dolby Vision IQ and Dolby Atmos, and NVIDIA G-SYNC Compatible.",
    features: [
      "Self-lit OLED pixels",
      "α9 Gen 4 AI Processor 4K",
      "Dolby Vision IQ & Dolby Atmos",
      "NVIDIA G-SYNC Compatible",
      "webOS Smart TV",
      "4K Cinema HDR",
      "Filmmaker Mode",
      "Game Optimizer",
    ],
    specifications: {
      Brand: "LG",
      Model: "OLED55C1PUB",
      Display: "55-inch OLED",
      Resolution: "4K Ultra HD (3840 x 2160)",
      Processor: "α9 Gen 4 AI Processor 4K",
      "HDR Format": "Dolby Vision, HDR10, HLG",
      "Refresh Rate": "120Hz",
      "Smart Platform": "webOS",
      Connectivity: "HDMI 2.1, Wi-Fi, Bluetooth, USB",
      Dimensions: "122.8 x 70.6 x 4.7 cm",
      Weight: "23.2kg",
    },
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 15,
    sku: "LG-OLED55C1-BLK",
    brand: "LG",
    category: "Electronics",
    tags: ["tv", "oled", "4k", "smart tv"],
    relatedProducts: ["2", "7"],
  },
  "102": {
    id: "102",
    name: "Apple AirPods Pro",
    price: 249.99,
    rating: 4.9,
    reviewCount: 892,
    description:
      "Active Noise Cancellation, Transparency mode, Adaptive EQ, and spatial audio with dynamic head tracking.",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Adaptive EQ",
      "Spatial audio with dynamic head tracking",
      "Sweat and water resistant (IPX4)",
      "Force sensor for control",
      "Up to 4.5 hours of listening time",
      "Wireless charging case",
    ],
    specifications: {
      Brand: "Apple",
      Model: "AirPods Pro",
      Connectivity: "Bluetooth 5.0",
      Chip: "H1 chip",
      "Battery Life": "4.5 hours (ANC on), 24 hours with case",
      Charging: "Lightning, Qi wireless",
      "Water Resistance": "IPX4",
      Weight: "5.4g each, 45.6g case",
    },
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 30,
    sku: "APPLE-AIRPODSPRO-WHT",
    brand: "Apple",
    category: "Electronics",
    tags: ["earbuds", "wireless", "noise-cancelling", "apple"],
    relatedProducts: ["1", "2", "3"],
  },
  "103": {
    id: "103",
    name: "Ring Indoor Cam",
    price: 59.99,
    discount: 15,
    rating: 4.5,
    reviewCount: 312,
    description:
      "Compact plug-in indoor security camera with two-way talk, night vision, and motion-activated notifications.",
    features: [
      "1080p HD video",
      "Two-way talk",
      "Night vision",
      "Motion detection",
      "Real-time notifications",
      "Works with Alexa",
      "Plug-in power",
      "Easy setup",
    ],
    specifications: {
      Brand: "Ring",
      Model: "Indoor Cam",
      Resolution: "1080p HD",
      "Field of View": "140° diagonal",
      "Night Vision": "Yes",
      "Two-way Audio": "Yes",
      Connectivity: "Wi-Fi (2.4GHz)",
      Power: "Plug-in (USB)",
      Dimensions: "4.98 x 4.98 x 7.56 cm",
      Weight: "104g",
    },
    images: [
      "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 25,
    sku: "RING-INDOORCAM-WHT",
    brand: "Ring",
    category: "Electronics",
    tags: ["security", "camera", "smart home", "indoor"],
    relatedProducts: ["7", "101"],
  },
  "104": {
    id: "104",
    name: "Garmin Venu 2 GPS Smartwatch",
    price: 399.99,
    rating: 4.7,
    reviewCount: 267,
    description:
      "AMOLED display, health monitoring, fitness tracking, music storage, and up to 11 days of battery life.",
    features: [
      "AMOLED display",
      "Health Snapshot",
      "Body Battery energy monitoring",
      "Sleep score and insights",
      "Fitness age",
      "Built-in sports apps",
      "Music storage (up to 650 songs)",
      "Garmin Pay",
      "Up to 11 days battery life",
    ],
    specifications: {
      Brand: "Garmin",
      Model: "Venu 2",
      Display: "1.3-inch AMOLED",
      Resolution: "416 x 416 pixels",
      "Battery Life": "Up to 11 days",
      "Water Rating": "5 ATM",
      Sensors: "GPS, heart rate, barometric altimeter, compass, gyroscope, accelerometer, thermometer",
      Memory: "4GB",
      Connectivity: "Bluetooth, ANT+, Wi-Fi",
      Dimensions: "45.4 x 45.4 x 12.2 mm",
      Weight: "49g",
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    ],
    stock: 18,
    sku: "GARMIN-VENU2-BLK",
    brand: "Garmin",
    category: "Electronics",
    tags: ["smartwatch", "fitness", "gps", "health"],
    relatedProducts: ["4", "102"],
  },
}

export function ProductDetails({ id }: { id: string }) {
  const { data: product, isLoading, error } = useQuery(["product", id], () => fetchProduct(id))
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const { addItem } = useCart()
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()
  const { t } = useLanguage()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  // Refs for toast notifications
  const addToCartRef = useRef<{ quantity: number; name: string } | null>(null)
  const addToWishlistRef = useRef<string | null>(null)
  const linkCopiedRef = useRef(false)

  const handleToggleWishlist = useCallback(() => {
    if (!user) {
      const currentPath = window.location.pathname
      router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
      return
    }

    if (product && isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else if (product) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        rating: product.rating,
        discount: product.discount,
        category: product.category,
        brand: product.brand,
      })
    }
  }, [product, user, router, isInWishlist, removeFromWishlist, addToWishlist])

  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return

      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100

      setZoomPosition({ x, y })
    },
    [isZoomed],
  )

  const handleAddToCart = useCallback(() => {
    if (!user) {
      const currentPath = window.location.pathname
      router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
      return
    }

    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discount ? product.price * (1 - product.discount / 100) : product.price,
        image: product.images[0],
        quantity: quantity,
      })

      addToCartRef.current = { quantity, name: product.name }
    }
  }, [addItem, product, quantity, user, router])

  const handleShare = useCallback(() => {
    if (navigator.share && product) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      navigator.clipboard.writeText(window.location.href)
      linkCopiedRef.current = true
    }
  }, [product])

  const handleBuyNow = useCallback(() => {
    if (!user) {
      const currentPath = window.location.pathname
      router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`)
      return
    }

    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discount ? product.price * (1 - product.discount / 100) : product.price,
        image: product.images[0],
        quantity: quantity,
      })

      router.push("/checkout")
    }
  }, [addItem, product, quantity, user, router])

  useEffect(() => {
    if (addToCartRef.current) {
      const { quantity, name } = addToCartRef.current
      toast({
        title: t("common.added_to_cart"),
        description: `${quantity} × ${name} ${t("common.added_to_cart").toLowerCase()}`,
      })
      addToCartRef.current = null
    }

    if (addToWishlistRef.current) {
      toast({
        title: t("common.added_to_wishlist"),
        description: `${addToWishlistRef.current} ${t("common.added_to_wishlist").toLowerCase()}`,
      })
      addToWishlistRef.current = null
    }

    if (linkCopiedRef.current) {
      toast({
        title: t("common.link_copied"),
        description: t("common.link_copied_message"),
      })
      linkCopiedRef.current = false
    }
  }, [toast, t])

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (error) {
    return <ErrorDisplay error={error as Error} />
  }

  if (!product) {
    return <ProductNotFound />
  }

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
  const isWishlisted = isInWishlist(product.id)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row gap-8"
      >
        <div className={`${isMobile ? "w-full" : "md:w-1/2"} space-y-4`}>
          <motion.div
            className={`relative aspect-square overflow-hidden rounded-lg border ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleImageMouseMove}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={`w-full h-full transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
              style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
            >
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes={isMobile ? "100vw" : isTablet ? "50vw" : "33vw"}
                priority
              />
            </motion.div>
            {product.discount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-sm font-bold px-2 py-1 rounded"
              >
                {product.discount}% OFF
              </motion.div>
            )}
          </motion.div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={isMobile ? "25vw" : isTablet ? "15vw" : "10vw"}
                />
              </motion.button>
            ))}
          </div>
        </div>
        <div className={`${isMobile ? "w-full" : "md:w-1/2"}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="mb-2 text-sm text-muted-foreground">
              <Link href={`/products?brand=${product.brand}`} className="hover:underline">
                {product.brand}
              </Link>
              {" / "}
              <Link href={`/products?category=${product.category}`} className="hover:underline">
                {product.category}
              </Link>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : i < product.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.2 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
              {product.stock <= 5 && (
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-600 border-amber-200">
                  {t("product.best_seller")}
                </Badge>
              )}
            </div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {product.discount ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-2 text-sm font-medium text-destructive">
                    {t("product.save")} ${(product.price - discountedPrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </motion.div>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <p className="text-muted-foreground">{product.description}</p>
            </motion.div>

            {product.tags && (
              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/products?tag=${tag}`}
                    className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full hover:bg-secondary/80"
                  >
                    {tag}
                  </Link>
                ))}
              </motion.div>
            )}

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">{t("product.availability")}</span>
                {product.stock > 0 ? (
                  <span className={`text-sm ${product.stock > 10 ? "text-green-600" : "text-amber-500"}`}>
                    {product.stock > 10
                      ? `${t("product.in_stock")} (${product.stock} available)`
                      : `${t("product.low_stock")} ${product.stock} ${t("product.left")}`}
                  </span>
                ) : (
                  <span className="text-sm text-destructive">{t("product.out_of_stock")}</span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-medium mr-2">{t("product.sku")}</span>
                <span className="text-sm text-muted-foreground">{product.sku}</span>
              </div>
            </motion.div>
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("product.add_to_cart")}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleBuyNow}>
                {t("product.buy_now")}
              </Button>
              <Button
                variant={isWishlisted ? "destructive" : "outline"}
                size="icon"
                className="ml-2"
                onClick={handleToggleWishlist}
                title={isWishlisted ? t("wishlist.remove_from_wishlist") : t("product.add_to_wishlist")}
              >
                <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon" className="ml-2" onClick={handleShare} title={t("product.share")}>
                <Share2 className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <Tabs defaultValue="description">
                <TabsList className="w-full">
                  <TabsTrigger value="description" className="flex-1">
                    {t("product.description")}
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex-1">
                    {t("product.features")}
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="flex-1">
                    {t("product.specifications")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="features" className="mt-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-border">
                        <div className="font-medium">{key}</div>
                        <div>{value}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 animate-pulse">
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-full aspect-square rounded-md" />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
        </div>
      </div>
    </div>
  )
}

function ErrorDisplay({ error }: { error: Error }) {
  const { t } = useLanguage()
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{t("common.error_occurred")}</h2>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Button onClick={() => window.location.reload()}>{t("common.try_again")}</Button>
    </motion.div>
  )
}

function ProductNotFound() {
  const { t } = useLanguage()
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{t("common.product_not_found")}</h2>
      <p className="text-muted-foreground mb-6">{t("common.product_not_found_message")}</p>
      <Button asChild>
        <Link href="/products">{t("common.browse_all")}</Link>
      </Button>
    </motion.div>
  )
}

async function fetchProduct(id: string) {
  // Replace this with your actual API call to fetch the product
  // For this example, we'll just use the mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products[id as keyof typeof products])
    }, 1000) // Simulate network delay
  })
}

