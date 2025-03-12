"use client"

import { useLanguage } from "@/hooks/use-language"

export default function RefundPolicyPage() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t("policies.refund.title")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("policies.refund.last_updated")}: {formattedDate}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section1.title")}</h2>
        <p className="mb-4">{t("policies.refund.section1.p1")}</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>{t("policies.refund.section1.list1.item1")}</li>
          <li>{t("policies.refund.section1.list1.item2")}</li>
          <li>{t("policies.refund.section1.list1.item3")}</li>
        </ul>
        <p className="mb-4">{t("policies.refund.section1.p2")}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("policies.refund.section1.list2.item1")}</li>
          <li>{t("policies.refund.section1.list2.item2")}</li>
          <li>{t("policies.refund.section1.list2.item3")}</li>
          <li>{t("policies.refund.section1.list2.item4")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section2.title")}</h2>
        <p className="mb-4">{t("policies.refund.section2.p1")}</p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section2.list.item1.title")}</h3>
            <p>{t("policies.refund.section2.list.item1.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section2.list.item2.title")}</h3>
            <p>{t("policies.refund.section2.list.item2.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section2.list.item3.title")}</h3>
            <p>{t("policies.refund.section2.list.item3.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section2.list.item4.title")}</h3>
            <p>{t("policies.refund.section2.list.item4.desc")}</p>
          </div>
        </div>
        <p className="mt-4">{t("policies.refund.section2.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section3.title")}</h2>
        <p className="mb-4">{t("policies.refund.section3.p1")}</p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section3.list.item1.title")}</h3>
            <p>{t("policies.refund.section3.list.item1.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section3.list.item2.title")}</h3>
            <p>{t("policies.refund.section3.list.item2.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.refund.section3.list.item3.title")}</h3>
            <p>{t("policies.refund.section3.list.item3.desc")}</p>
          </div>
        </div>
        <p className="mt-4">{t("policies.refund.section3.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section4.title")}</h2>
        <p className="mb-4">{t("policies.refund.section4.p1")}</p>
        <p>{t("policies.refund.section4.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section5.title")}</h2>
        <p className="mb-4">{t("policies.refund.section5.p1")}</p>
        <p className="mb-4">{t("policies.refund.section5.p2")}</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>{t("policies.refund.section5.list.item1")}</li>
          <li>{t("policies.refund.section5.list.item2")}</li>
          <li>{t("policies.refund.section5.list.item3")}</li>
          <li>{t("policies.refund.section5.list.item4")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section6.title")}</h2>
        <p>{t("policies.refund.section6.p1")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("policies.refund.section7.title")}</h2>
        <p className="mb-4">{t("policies.refund.section7.p1")}</p>
        <div className="bg-muted p-4 rounded-md">
          <p>
            <strong>{t("policies.refund.section7.contact.email")}:</strong> support@example.com
          </p>
          <p>
            <strong>{t("policies.refund.section7.contact.phone")}:</strong> +1 (234) 567-8900
          </p>
          <p>
            <strong>{t("policies.refund.section7.contact.hours")}:</strong>{" "}
            {t("policies.refund.section7.contact.hours_value")}
          </p>
        </div>
      </section>
    </div>
  )
}

