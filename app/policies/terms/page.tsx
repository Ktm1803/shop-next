"use client"

import { useLanguage } from "@/hooks/use-language"

export default function TermsOfServicePage() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t("policies.terms.title")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("policies.terms.last_updated")}: {formattedDate}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section1.title")}</h2>
        <p>{t("policies.terms.section1.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section2.title")}</h2>
        <p className="mb-4">{t("policies.terms.section2.p1")}</p>
        <p>{t("policies.terms.section2.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section3.title")}</h2>
        <p className="mb-4">{t("policies.terms.section3.p1")}</p>
        <p>{t("policies.terms.section3.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section4.title")}</h2>
        <p className="mb-4">{t("policies.terms.section4.p1")}</p>
        <p>{t("policies.terms.section4.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section5.title")}</h2>
        <p className="mb-4">{t("policies.terms.section5.p1")}</p>
        <p>{t("policies.terms.section5.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section6.title")}</h2>
        <p>{t("policies.terms.section6.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section7.title")}</h2>
        <p className="mb-4">{t("policies.terms.section7.p1")}</p>
        <p>{t("policies.terms.section7.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section8.title")}</h2>
        <p className="mb-4">{t("policies.terms.section8.p1")}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("policies.terms.section8.list.item1")}</li>
          <li>{t("policies.terms.section8.list.item2")}</li>
          <li>{t("policies.terms.section8.list.item3")}</li>
          <li>{t("policies.terms.section8.list.item4")}</li>
          <li>{t("policies.terms.section8.list.item5")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section9.title")}</h2>
        <p className="mb-4">{t("policies.terms.section9.p1")}</p>
        <p>{t("policies.terms.section9.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section10.title")}</h2>
        <p>{t("policies.terms.section10.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section11.title")}</h2>
        <p>{t("policies.terms.section11.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section12.title")}</h2>
        <p>{t("policies.terms.section12.p1")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("policies.terms.section13.title")}</h2>
        <p className="mb-4">{t("policies.terms.section13.p1")}</p>
        <div className="bg-muted p-4 rounded-md">
          <p>
            <strong>{t("policies.terms.section13.contact.email")}:</strong> support@example.com
          </p>
          <p>
            <strong>{t("policies.terms.section13.contact.phone")}:</strong> +1 (234) 567-8900
          </p>
          <p>
            <strong>{t("policies.terms.section13.contact.address")}:</strong> 123 Shop Street, City, Country
          </p>
        </div>
      </section>
    </div>
  )
}

