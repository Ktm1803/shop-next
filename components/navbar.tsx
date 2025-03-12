"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  User,
  Heart,
  ShoppingCart,
  Menu,
  Shield,
  LogIn,
  LogOut,
  Home,
  Package,
  Search,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { CartBadge } from "@/components/cart-badge"
import { NotificationButton } from "@/components/notification-button"
import { Input } from "@/components/ui/input"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-64">
              <div className="px-4 py-3 border-b">
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingBag className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold text-lg">ShopName</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 mt-4 px-2">
                <Link
                  href="/"
                  className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-4 w-4 mr-3" />
                  {t("nav.home")}
                </Link>
                <Link
                  href="/products"
                  className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-4 w-4 mr-3" />
                  {t("nav.products")}
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 mr-3" />
                  {t("nav.categories")}
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-3" />
                  {t("nav.wishlist")}
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  {t("nav.cart")}
                </Link>

                {user ? (
                  <>
                    <div className="h-px bg-border my-2"></div>
                    <Link
                      href="/profile"
                      className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      {t("nav.account")}
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-3" />
                      {t("nav.orders")}
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-3 text-primary" />
                        {t("nav.admin_dashboard")}
                      </Link>
                    )}
                    <button
                      className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors text-destructive w-full text-left"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-4 w-4 mr-3" />
                    {t("nav.login")}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden md:inline-block">ShopName</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.products")}
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.categories")}
            </Link>
            <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.deals")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <Input
              type="search"
              placeholder={t("nav.search_placeholder")}
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("nav.search")}</span>
            </Button>
          </form>

          <LanguageSwitcher />
          <NotificationButton />

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">{t("nav.wishlist")}</span>
              {/* Add wishlist count badge if needed */}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <CartBadge />
              <span className="sr-only">{t("nav.cart")}</span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs">{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{t("nav.account")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>{t("nav.orders")}</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>{t("nav.admin_dashboard")}</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("nav.logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                {t("nav.login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}

