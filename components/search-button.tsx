"use client"

import type { FormEvent } from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/use-language"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"

export function SearchButton() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setOpen(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen(true)}
        aria-label={t("search.button")}
      >
        <Search className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("search.title")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type="search"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10"
                autoFocus
              />
            </div>
            <Button type="submit" size="sm" disabled={!searchQuery.trim()}>
              <Search className="h-4 w-4 mr-2" />
              {t("search.button")}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{t("search.popular")}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Headphones", "Smartphones", "Laptops", "Wireless", "Cameras"].map((term) => (
                <motion.div key={term} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term)
                      router.push(`/search?q=${encodeURIComponent(term)}`)
                      setOpen(false)
                    }}
                  >
                    {term}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

