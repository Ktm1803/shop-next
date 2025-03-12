"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// Mock data with real product images
const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Sony WH-1000XM4 Wireless Bluetooth Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: "2",
    name: "Samsung Galaxy S21 Ultra 5G",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    quantity: 1,
  },
  {
    id: "5",
    name: "Anker Wireless Charging Pad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?q=80&w=1000&auto=format&fit=crop",
    quantity: 2,
  },
]

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth() // Add user auth check

  // References to track actions for toast notifications
  const itemAddedRef = useRef<CartItem | null>(null)
  const itemRemovedRef = useRef<CartItem | null>(null)
  const itemUpdatedRef = useRef<{ item: CartItem; quantity: number } | null>(null)
  const cartClearedRef = useRef(false)
  const notLoggedInRef = useRef(false)

  // Load cart from localStorage on mount - only if user is logged in
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart-${user.id}`)
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart))
        } catch (error) {
          console.error("Error parsing stored cart:", error)
          setItems([])
        }
      } else {
        // For demo purposes, we'll load initial items if cart is empty
        // In a real app, we would start with an empty cart
        setItems(initialItems)
        localStorage.setItem(`cart-${user.id}`, JSON.stringify(initialItems))
      }
    } else {
      // Clear cart if user is not logged in
      setItems([])
    }
  }, [user])

  // Save cart to localStorage when it changes - only if user is logged in
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  // Handle toast notifications separately from state updates
  useEffect(() => {
    // Item added toast
    if (itemAddedRef.current) {
      const item = itemAddedRef.current
      toast({
        title: "Item added to cart",
        description: `${item.name} has been added to your cart`,
      })
      itemAddedRef.current = null
    }

    // Item removed toast
    if (itemRemovedRef.current) {
      const item = itemRemovedRef.current
      toast({
        title: "Item removed",
        description: `${item.name} has been removed from your cart`,
      })
      itemRemovedRef.current = null
    }

    // Item quantity updated toast
    if (itemUpdatedRef.current) {
      const { item, quantity } = itemUpdatedRef.current
      toast({
        title: "Quantity updated",
        description: `${item.name} quantity updated to ${quantity}`,
      })
      itemUpdatedRef.current = null
    }

    // Cart cleared toast
    if (cartClearedRef.current) {
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      })
      cartClearedRef.current = false
    }

    // Not logged in toast
    if (notLoggedInRef.current) {
      toast({
        title: "Login required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      })
      notLoggedInRef.current = false
    }
  }, [toast])

  const addItem = useCallback(
    (item: CartItem | Omit<CartItem, "quantity">) => {
      // Check if user is logged in
      if (!user) {
        notLoggedInRef.current = true
        return
      }

      setItems((prevItems) => {
        // Make sure prevItems is an array before operations
        const currentItems = Array.isArray(prevItems) ? prevItems : []

        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + ("quantity" in item ? item.quantity : 1),
          }
          itemUpdatedRef.current = { item: updatedItem, quantity: updatedItem.quantity }
          return currentItems.map((i) => (i.id === item.id ? updatedItem : i))
        }

        const newItem = "quantity" in item ? item : ({ ...item, quantity: 1 } as CartItem)
        itemAddedRef.current = newItem
        return [...currentItems, newItem]
      })
    },
    [user],
  )

  const removeItem = useCallback(
    (id: string) => {
      // Check if user is logged in
      if (!user) return

      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.id === id)
        if (itemToRemove) {
          itemRemovedRef.current = itemToRemove
        }
        return prevItems.filter((item) => item.id !== id)
      })
    },
    [user],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      // Check if user is logged in
      if (!user) return
      if (!id || quantity < 1) return

      setItems((prevItems) => {
        // Make sure prevItems is an array before operations
        const currentItems = Array.isArray(prevItems) ? prevItems : []

        const updatedItems = currentItems.map((item) => {
          if (item.id === id) {
            const updatedItem = { ...item, quantity }
            itemUpdatedRef.current = { item: updatedItem, quantity }
            return updatedItem
          }
          return item
        })

        return updatedItems
      })
    },
    [user],
  )

  const clearCart = useCallback(() => {
    // Check if user is logged in
    if (!user) return

    cartClearedRef.current = true
    setItems([])
    if (user) {
      localStorage.removeItem(`cart-${user.id}`)
    }
  }, [user])

  const subtotal = Array.isArray(items) ? items.reduce((total, item) => total + item.price * item.quantity, 0) : 0

  // Fix the totalItems calculation to handle undefined items more robustly
  const totalItems = Array.isArray(items) ? items.reduce((total, item) => total + (item?.quantity || 0), 0) : 0

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    isEmpty: items.length === 0,
    totalItems,
    isLoggedIn: !!user,
  }
}

