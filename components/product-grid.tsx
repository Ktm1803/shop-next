"use client"

import { ProductCard } from "@/components/product-card"
import { motion } from "framer-motion"

const products = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    discount: 15,
    description:
      "Industry-leading noise cancellation with Dual Noise Sensor technology, 30-hour battery life, and touch sensor controls.",
    brand: "Sony",
    category: "Electronics",
    stock: 25,
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    description:
      "Pro-grade camera with 108MP, 8K video, and 100x Space Zoom. 5G connectivity and all-day battery life.",
    brand: "Samsung",
    category: "Electronics",
    stock: 12,
  },
  {
    id: "3",
    name: "Apple MacBook Pro 16-inch",
    price: 2399.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
    description:
      "Apple M1 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display, and up to 21 hours of battery life.",
    brand: "Apple",
    category: "Electronics",
    stock: 8,
  },
  {
    id: "4",
    name: "Fitbit Versa 3 Health & Fitness Smartwatch",
    price: 229.95,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    description:
      "Built-in GPS, heart rate monitoring, sleep tracking, and 6+ day battery life. Works with Amazon Alexa and Google Assistant.",
    brand: "Fitbit",
    category: "Electronics",
    stock: 30,
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    rating: 4.3,
    discount: 20,
    description: "Fast wireless charging for Qi-enabled devices. Charges through most cases up to 5mm thick.",
    brand: "Anker",
    category: "Electronics",
    stock: 50,
  },
  {
    id: "6",
    name: "JBL Flip 5 Waterproof Portable Bluetooth Speaker",
    price: 119.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    description: "Waterproof IPX7 design, 12 hours of playtime, and PartyBoost for multiple speaker pairing.",
    brand: "JBL",
    category: "Electronics",
    stock: 35,
  },
  {
    id: "7",
    name: "PlayStation 5 Console",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    description:
      "Lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, and breathtaking immersion with 3D audio.",
    brand: "Sony",
    category: "Electronics",
    stock: 5,
  },
  {
    id: "8",
    name: "Logitech MX Master 3 Wireless Mouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 5,
    description:
      "Ultra-fast scrolling, ergonomic design, and customizable buttons. Works on any surface, including glass.",
    brand: "Logitech",
    category: "Electronics",
    stock: 20,
  },
  {
    id: "9",
    name: "Nike Air Zoom Pegasus 38 Running Shoes",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Responsive cushioning and breathable mesh upper for comfortable runs. Zoom Air unit for extra bounce.",
    brand: "Nike",
    category: "Clothing",
    stock: 45,
  },
  {
    id: "10",
    name: "Adidas Ultraboost 21 Running Shoes",
    price: 180.0,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
    description:
      "Responsive Boost midsole, Primeknit+ upper, and supportive heel counter for maximum comfort and performance.",
    brand: "Adidas",
    category: "Clothing",
    stock: 38,
  },
  {
    id: "11",
    name: "Levi's 501 Original Fit Jeans",
    price: 59.5,
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    description:
      "The original button fly jean that started it all. Straight leg, non-stretch denim with iconic styling.",
    brand: "Levi's",
    category: "Clothing",
    stock: 60,
  },
  {
    id: "12",
    name: "Patagonia Better Sweater Fleece Jacket",
    price: 139.0,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    description: "Warm, polyester fleece made with recycled materials. Perfect for layering in cold weather.",
    brand: "Patagonia",
    category: "Clothing",
    stock: 25,
  },
  {
    id: "13",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 15,
    description:
      "7-in-1 appliance: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    stock: 42,
  },
  {
    id: "14",
    name: "Dyson V11 Cordless Vacuum Cleaner",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Powerful suction, intelligent cleaning, and up to 60 minutes of run time. Includes multiple attachments.",
    brand: "Dyson",
    category: "Home & Kitchen",
    stock: 15,
  },
  {
    id: "15",
    name: "KitchenAid Stand Mixer",
    price: 379.99,
    image: "https://images.unsplash.com/photo-1578738288760-05ce9be719d3?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    discount: 5,
    description:
      "Tilt-head stand mixer with 10 speeds and 5-quart stainless steel bowl. Includes beater, dough hook, and wire whip.",
    brand: "KitchenAid",
    category: "Home & Kitchen",
    stock: 20,
  },
  {
    id: "16",
    name: "Philips Hue White and Color Ambiance Starter Kit",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Smart LED bulbs that can be controlled via app or voice. Millions of colors and shades of white light.",
    brand: "Philips",
    category: "Home & Kitchen",
    stock: 30,
  },
  {
    id: "17",
    name: "Neutrogena Hydro Boost Water Gel",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Lightweight gel moisturizer with hyaluronic acid. Instantly quenches dry skin and keeps it hydrated for 48 hours.",
    brand: "Neutrogena",
    category: "Beauty & Personal Care",
    stock: 75,
  },
  {
    id: "18",
    name: "Olaplex No. 3 Hair Perfector",
    price: 28.0,
    image: "https://images.unsplash.com/photo-1626766900885-00a5d381c6d5?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    description: "At-home treatment that reduces breakage and visibly strengthens hair, improving its look and feel.",
    brand: "Olaplex",
    category: "Beauty & Personal Care",
    stock: 40,
  },
  {
    id: "19",
    name: "Cerave Hydrating Facial Cleanser",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    discount: 10,
    description:
      "Gentle, non-foaming cleanser that removes dirt and makeup while maintaining the skin's natural moisture barrier.",
    brand: "Cerave",
    category: "Beauty & Personal Care",
    stock: 65,
  },
  {
    id: "20",
    name: "Dyson Airwrap Complete Styler",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    description:
      "Complete styling tool that curls, waves, smooths, and dries hair with no extreme heat. Includes multiple attachments for different styles.",
    brand: "Dyson",
    category: "Beauty & Personal Care",
    stock: 10,
  },
]

// Make sure we're using the correct product properties in ProductGrid
export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 w-full max-w-[1920px] mx-auto">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          <ProductCard key={product.id} product={product} />
        </motion.div>
      ))}
    </div>
  )
}

