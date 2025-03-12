"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useCallback } from "react"
import { useAuth } from "@/hooks/use-auth"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const { user } = useAuth()

  const handleQuantityDecrease = useCallback(() => {
    if (item.quantity > 1 && user) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }, [item.id, item.quantity, updateQuantity, user])

  const handleQuantityIncrease = useCallback(() => {
    if (user) {
      updateQuantity(item.id, item.quantity + 1)
    }
  }, [item.id, item.quantity, updateQuantity, user])

  const handleRemove = useCallback(() => {
    if (user) {
      removeItem(item.id)
    }
  }, [item.id, removeItem, user])

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative h-24 w-24 overflow-hidden rounded-md border">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.id}`} className="text-lg font-medium hover:underline line-clamp-1">
          {item.name}
        </Link>
        <div className="mt-1 flex items-center">
          <span className="text-sm text-muted-foreground">
            ${item.price.toFixed(2)} × {item.quantity}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleQuantityDecrease}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleQuantityIncrease}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  )
}

