"use client"

import { useLanguage } from "@/hooks/use-language"

export default function PrivacyPolicyPage() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t("policies.privacy.title")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("policies.privacy.last_updated")}: {formattedDate}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section1.title")}</h2>
        <p className="mb-4">{t("policies.privacy.section1.p1")}</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>{t("policies.privacy.section1.list.item1")}</li>
          <li>{t("policies.privacy.section1.list.item2")}</li>
          <li>{t("policies.privacy.section1.list.item3")}</li>
          <li>{t("policies.privacy.section1.list.item4")}</li>
          <li>{t("policies.privacy.section1.list.item5")}</li>
          <li>{t("policies.privacy.section1.list.item6")}</li>
        </ul>
        <p>{t("policies.privacy.section1.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section2.title")}</h2>
        <p className="mb-4">{t("policies.privacy.section2.p1")}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("policies.privacy.section2.list.item1")}</li>
          <li>{t("policies.privacy.section2.list.item2")}</li>
          <li>{t("policies.privacy.section2.list.item3")}</li>
          <li>{t("policies.privacy.section2.list.item4")}</li>
          <li>{t("policies.privacy.section2.list.item5")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section3.title")}</h2>
        <p className="mb-4">{t("policies.privacy.section3.p1")}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("policies.privacy.section3.list.item1")}</li>
          <li>{t("policies.privacy.section3.list.item2")}</li>
          <li>{t("policies.privacy.section3.list.item3")}</li>
          <li>{t("policies.privacy.section3.list.item4")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section4.title")}</h2>
        <p>{t("policies.privacy.section4.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section5.title")}</h2>
        <p>{t("policies.privacy.section5.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section6.title")}</h2>
        <p className="mb-4">{t("policies.privacy.section6.p1")}</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>{t("policies.privacy.section6.list.item1")}</li>
          <li>{t("policies.privacy.section6.list.item2")}</li>
          <li>{t("policies.privacy.section6.list.item3")}</li>
          <li>{t("policies.privacy.section6.list.item4")}</li>
          <li>{t("policies.privacy.section6.list.item5")}</li>
          <li>{t("policies.privacy.section6.list.item6")}</li>
        </ul>
        <p>{t("policies.privacy.section6.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section7.title")}</h2>
        <p>{t("policies.privacy.section7.p1")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("policies.privacy.section8.title")}</h2>
        <p className="mb-4">{t("policies.privacy.section8.p1")}</p>
        <div className="bg-muted p-4 rounded-md">
          <p>
            <strong>{t("policies.privacy.section8.contact.email")}:</strong> support@example.com
          </p>
          <p>
            <strong>{t("policies.privacy.section8.contact.phone")}:</strong> +1 (234) 567-8900
          </p>
          <p>
            <strong>{t("policies.privacy.section8.contact.address")}:</strong> 123 Shop Street, City, Country
          </p>
        </div>
      </section>
    </div>
  )
}

