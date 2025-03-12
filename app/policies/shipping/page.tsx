"use client"

import { useLanguage } from "@/hooks/use-language"

export default function ShippingPolicyPage() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate)

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{t("policies.shipping.title")}</h1>
      <p className="text-muted-foreground mb-8">
        {t("policies.shipping.last_updated")}: {formattedDate}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section1.title")}</h2>
        <p className="mb-4">{t("policies.shipping.section1.p1")}</p>
        <p>{t("policies.shipping.section1.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section2.title")}</h2>
        <p className="mb-4">{t("policies.shipping.section2.p1")}</p>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.shipping.section2.list.item1.title")}</h3>
            <p>{t("policies.shipping.section2.list.item1.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.shipping.section2.list.item2.title")}</h3>
            <p>{t("policies.shipping.section2.list.item2.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.shipping.section2.list.item3.title")}</h3>
            <p>{t("policies.shipping.section2.list.item3.desc")}</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold">{t("policies.shipping.section2.list.item4.title")}</h3>
            <p>{t("policies.shipping.section2.list.item4.desc")}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section3.title")}</h2>
        <p className="mb-4">{t("policies.shipping.section3.p1")}</p>
        <p className="mb-4">{t("policies.shipping.section3.p2")}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border px-4 py-2 text-left">{t("policies.shipping.section3.table.header1")}</th>
                <th className="border px-4 py-2 text-left">{t("policies.shipping.section3.table.header2")}</th>
                <th className="border px-4 py-2 text-left">{t("policies.shipping.section3.table.header3")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row1.col1")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row1.col2")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row1.col3")}</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row2.col1")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row2.col2")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row2.col3")}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row3.col1")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row3.col2")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row3.col3")}</td>
              </tr>
              <tr className="bg-muted/50">
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row4.col1")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row4.col2")}</td>
                <td className="border px-4 py-2">{t("policies.shipping.section3.table.row4.col3")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section4.title")}</h2>
        <p>{t("policies.shipping.section4.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section5.title")}</h2>
        <p className="mb-4">{t("policies.shipping.section5.p1")}</p>
        <p>{t("policies.shipping.section5.p2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section6.title")}</h2>
        <p>{t("policies.shipping.section6.p1")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section7.title")}</h2>
        <p>{t("policies.shipping.section7.p1")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("policies.shipping.section8.title")}</h2>
        <p className="mb-4">{t("policies.shipping.section8.p1")}</p>
        <div className="bg-muted p-4 rounded-md">
          <p>
            <strong>{t("policies.shipping.section8.contact.email")}:</strong> support@example.com
          </p>
          <p>
            <strong>{t("policies.shipping.section8.contact.phone")}:</strong> +1 (234) 567-8900
          </p>
          <p>
            <strong>{t("policies.shipping.section8.contact.hours")}:</strong>{" "}
            {t("policies.shipping.section8.contact.hours_value")}
          </p>
        </div>
      </section>
    </div>
  )
}

