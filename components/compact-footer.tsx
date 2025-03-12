import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function CompactFooter() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t py-4 text-sm">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          <span className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            <a href="tel:+1234567890" className="hover:underline">
              +1 (234) 567-890
            </a>
          </span>
          <span className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            <a href="mailto:support@shopname.com" className="hover:underline">
              support@shopname.com
            </a>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/faq" className="hover:underline">
            {t("footer.faq")}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t("footer.contact")}
          </Link>
          <span>&copy; {currentYear} ShopName</span>
        </div>
      </div>
    </footer>
  )
}

