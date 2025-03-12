"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

// Import translations
import enTranslations from "@/locales/en.json"

// Language context type
type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
  isTranslating: boolean
}

// Create context with undefined default
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation cache to avoid repeated API calls
type TranslationCache = Record<string, Record<string, any>>

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")
  const [translationCache, setTranslationCache] = useState<TranslationCache>({
    en: enTranslations,
  })
  const [isTranslating, setIsTranslating] = useState(false)

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (["en", "vi", "th", "ja", "zh", "ko"].includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  // Function to load translation file dynamically
  const loadTranslation = useCallback(
    async (lang: string) => {
      if (lang === "en" || translationCache[lang]) {
        return
      }

      setIsTranslating(true)

      try {
        // Dynamic import of translation files
        let translations

        switch (lang) {
          case "vi":
            translations = (await import("@/locales/vi.json")).default
            break
          case "zh":
            translations = (await import("@/locales/zh.json")).default
            break
          case "th":
            translations = (await import("@/locales/th.json")).default
            break
          case "ko":
            translations = (await import("@/locales/ko.json")).default
            break
          case "ja":
            translations = (await import("@/locales/ja.json")).default
            break
          // Add more languages as needed
          default:
            throw new Error(`Translation file for ${lang} not found`)
        }

        // Update cache with new translations
        setTranslationCache((prev) => ({
          ...prev,
          [lang]: translations,
        }))
      } catch (error) {
        console.error(`Failed to load ${lang} translations:`, error)
        // Fallback to English on error
      } finally {
        setIsTranslating(false)
      }
    },
    [translationCache],
  )

  // Set language and save to localStorage, then trigger translation loading
  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang)
      localStorage.setItem("language", lang)

      // Load translation if not already in cache
      if (lang !== "en" && !translationCache[lang]) {
        loadTranslation(lang)
      }
    },
    [translationCache, loadTranslation],
  )

  // Trigger translation loading when language changes
  useEffect(() => {
    if (language !== "en" && !translationCache[language]) {
      loadTranslation(language)
    }
  }, [language, translationCache, loadTranslation])

  // Translation function
  const t = useCallback(
    (key: string) => {
      // Split the key by dots to access nested properties
      const keys = key.split(".")

      // Get the translations for the current language
      const translations = translationCache[language] || enTranslations

      // Navigate through the nested objects to find the translation
      let result: any = translations
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k]
        } else {
          // If key not found in current language, try English
          if (language !== "en") {
            let fallback: any = enTranslations
            for (const fk of keys) {
              if (fallback && typeof fallback === "object" && fk in fallback) {
                fallback = fallback[fk]
              } else {
                return key // Return the key itself if not found in English either
              }
            }
            return typeof fallback === "string" ? fallback : key
          }
          return key // Return the key itself if not found
        }
      }

      return typeof result === "string" ? result : key
    },
    [language, translationCache],
  )

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    isTranslating,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

