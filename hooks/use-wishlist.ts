"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  discount?: number
  rating: number
  category: string
  brand: string
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()
  const { t } = useLanguage()

  // Load wishlist from localStorage on mount - only if user is logged in
  useEffect(() => {
    if (user) {
      setIsLoading(true)
      const storedWishlist = localStorage.getItem(`wishlist-${user.id}`)
      if (storedWishlist) {
        try {
          setItems(JSON.parse(storedWishlist))
        } catch (error) {
          console.error("Error parsing stored wishlist:", error)
          setItems([])
        }
      } else {
        setItems([])
      }
      setIsLoading(false)
    } else {
      // Clear wishlist if user is not logged in
      setItems([])
      setIsLoading(false)
    }
  }, [user])

  // Save wishlist to localStorage when it changes - only if user is logged in
  useEffect(() => {
    if (user && !isLoading) {
      localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(items))
    }
  }, [items, user, isLoading])

  const addItem = useCallback(
    (item: WishlistItem) => {
      // Check if user is logged in
      if (!user) {
        toast({
          title: t("wishlist.login_required"),
          description: t("wishlist.login_message"),
          variant: "destructive",
        })
        return false
      }

      // Check if item already exists in wishlist
      if (items.some((i) => i.id === item.id)) {
        toast({
          title: t("wishlist.already_in_wishlist"),
          description: t("wishlist.already_in_wishlist_message"),
        })
        return false
      }

      setItems((prev) => [...prev, item])

      toast({
        title: t("wishlist.added_to_wishlist"),
        description: `${item.name} ${t("wishlist.added_to_wishlist_message")}`,
      })

      return true
    },
    [items, user, toast, t],
  )

  const removeItem = useCallback(
    (id: string) => {
      // Check if user is logged in
      if (!user) return false

      const itemToRemove = items.find((item) => item.id === id)
      if (!itemToRemove) return false

      setItems((prev) => prev.filter((item) => item.id !== id))

      toast({
        title: t("wishlist.removed_from_wishlist"),
        description: `${itemToRemove.name} ${t("wishlist.removed_from_wishlist_message")}`,
      })

      return true
    },
    [items, user, toast, t],
  )

  const clearWishlist = useCallback(() => {
    // Check if user is logged in
    if (!user) return false

    setItems([])

    toast({
      title: t("wishlist.cleared"),
      description: t("wishlist.cleared_message"),
    })

    return true
  }, [user, toast, t])

  const isInWishlist = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  return {
    items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    isEmpty: items.length === 0,
    totalItems: items.length,
    isLoading,
    isLoggedIn: !!user,
  }
}

