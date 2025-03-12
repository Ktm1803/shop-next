"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"

export function Footer() {
  const [showFooter, setShowFooter] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show footer when user scrolls to 90% of the page
      if (scrollPosition > (documentHeight - windowHeight) * 0.9) {
        setShowFooter(true)
        document.body.classList.add("show-footer")
      } else {
        setShowFooter(false)
        document.body.classList.remove("show-footer")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check in case page is already scrolled
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.classList.remove("show-footer")
    }
  }, [])

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 bg-background border-t z-50 transition-transform duration-300 ${showFooter ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="container max-w-[1920px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.about_us")}</h3>
            <p className="text-muted-foreground mb-4">{t("footer.company_description")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.cart")}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.wishlist")}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.account")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.quick_links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/policies/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms_of_service")}
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.shipping_policy")}
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.refund_policy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact_us")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.address")}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.phone")}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} E-Commerce. {t("footer.all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

