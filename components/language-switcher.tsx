"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Globe, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "th", name: "ภาษาไทย", flag: "🇹🇭" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, isTranslating } = useLanguage()
  const [open, setOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0] // Default to English

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          <span className="absolute -bottom-1 -right-1 text-[10px]">{currentLanguage.flag}</span>
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {languages.map((lang) => (
          <motion.div key={lang.code} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <DropdownMenuItem
              className={cn("flex items-center gap-2 cursor-pointer", language === lang.code && "bg-accent")}
              onClick={() => handleLanguageChange(lang.code)}
              disabled={isTranslating}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="flex-1">{lang.name}</span>
              {language === lang.code && <Check className="h-4 w-4" />}
              {isTranslating && language === lang.code && <Loader2 className="h-3 w-3 animate-spin ml-1" />}
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

