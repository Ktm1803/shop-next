"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, ShoppingBag, Heart, User, ShoppingCart, LogIn, Package, Search, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartBadge } from "@/components/cart-badge"
import { useTranslation } from "react-i18next"

export function AppSidebar() {
  const { user, logout, isAdmin } = useAuth()
  const { t } = useTranslation()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-3 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">Shop</span>
        </Link>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t("nav.navigation")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span className="ml-3 text-sm">{t("nav.home")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link href="/products">
                    <Package className="h-4 w-4" />
                    <span className="ml-3 text-sm">{t("nav.products")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link href="/cart" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="ml-3 text-sm">{t("nav.cart")}</span>
                    <CartBadge />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link href="/wishlist">
                    <Heart className="h-4 w-4" />
                    <span className="ml-3 text-sm">{t("nav.wishlist")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Link href="/search">
                    <Search className="h-4 w-4" />
                    <span className="ml-3 text-sm">{t("search.button")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t("nav.categories")}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href="/products?category=electronics">
                      <span className="ml-2 text-sm">{t("categories.electronics")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href="/products?category=clothing">
                      <span className="ml-2 text-sm">{t("categories.clothing")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href="/products?category=home">
                      <span className="ml-2 text-sm">{t("categories.home_kitchen")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href="/products?category=beauty">
                      <span className="ml-2 text-sm">{t("categories.beauty")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          {user ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto w-full justify-start px-2 py-1.5 rounded-md hover:bg-muted">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="text-xs">{t("profile.my_account")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("profile.profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>{t("profile.orders")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("profile.settings")}</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <User className="mr-2 h-4 w-4" />
                          <span>{t("profile.admin")}</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("profile.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  <span className="ml-3 text-sm">{t("profile.login_register")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

