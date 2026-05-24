"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const legalContent: Record<string, { title: string; content: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    content: [
      `Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      'D-Bites Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and purchase our products, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.',
      "**Information We Collect:** We collect personal information that you provide when placing an order, including your name, email address, phone number, delivery address, and payment details. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our site through cookies and similar technologies.",
      "**How We Use Your Information:** We use your personal information to process and deliver your orders, communicate with you about your purchases and account, send promotional communications (with your consent), improve our website and services, comply with legal obligations, and prevent fraud and enhance security. We may also use anonymised data for analytics purposes to understand how our customers use our website.",
      "**Legal Basis for Processing:** Under UK GDPR, we process your data on the following legal bases: consent (for marketing communications), contractual necessity (to fulfil orders), legitimate interest (for analytics and fraud prevention), and legal compliance (for tax and regulatory requirements).",
      "**Data Sharing:** We do not sell your personal data. We may share your information with trusted third parties who help us operate our business, including payment processors, delivery partners, and email service providers. All third-party partners are contractually obligated to handle your data securely and in compliance with UK GDPR.",
      "**Data Retention:** We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, typically no longer than 6 years for financial records and 3 years for marketing consent records. You may request deletion of your data at any time, subject to legal retention requirements.",
      "**Your Rights:** Under UK GDPR, you have the right to access your personal data, rectify inaccurate data, request deletion of your data, restrict processing, data portability, and object to processing. You also have the right to withdraw consent at any time. To exercise any of these rights, please contact us at privacy@dbites.co.uk.",
      "**Cookies:** We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function properly. See our cookie banner for more details.",
      '**Changes to This Policy:** We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.',
      "**Contact:** For any privacy-related questions or concerns, please contact our Data Protection Officer at privacy@dbites.co.uk or write to us at D-Bites Ltd, 123 Tropical Lane, London, UK, SW1A 1AA.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      `Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "Welcome to D-Bites. These Terms and Conditions govern your use of our website (dbites-web.vercel.app) and the purchase of products from D-Bites Ltd. By accessing our website or placing an order, you agree to be bound by these terms. If you do not agree with any part of these terms, you should not use our website.",
      "**Eligibility:** You must be at least 16 years of age to use our website and purchase products. By placing an order, you represent and warrant that you are at least 16 years old and have the legal capacity to enter into a binding contract. If you are placing an order on behalf of a business, you warrant that you have the authority to bind that business to these terms.",
      "**Products & Pricing:** All product descriptions, images, and prices are subject to change without notice. We make every effort to ensure accuracy, but we do not guarantee that product descriptions or other content on the website are error-free. All prices are displayed in British Pounds Sterling (£) and include VAT where applicable. We reserve the right to refuse or cancel any order for any reason, including pricing errors.",
      "**Order Process:** When you place an order, you are making an offer to purchase the products selected. We will send you an order confirmation email to acknowledge receipt of your order. This confirmation does not constitute acceptance of your order. A contract is formed only when we dispatch the products to you. We reserve the right to limit quantities and refuse orders we believe to be placed in bad faith.",
      "**Payment:** We accept major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and PayPal. Payment is processed securely through our payment service provider. You must ensure that all payment details you provide are correct and that you are authorised to use the payment method selected.",
      "**Delivery:** We offer Standard Delivery (3-5 business days) and Express Delivery (1-2 business days) within the United Kingdom. Free standard delivery is available on orders over £30. Delivery times are estimates and are not guaranteed. We are not responsible for delays caused by courier services, customs, or circumstances beyond our control. Risk of loss and title for items purchased pass to you upon delivery to the courier.",
      "**Returns & Refunds:** You have the right to cancel your order within 14 days of receiving your goods, in accordance with the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013. Products must be returned in their original, unopened packaging. We will issue a full refund within 14 days of receiving the returned goods. Return shipping costs are the responsibility of the customer unless the goods are faulty or incorrect. Please see our Returns & Refund Policy for full details.",
      "**Limitation of Liability:** To the fullest extent permitted by law, D-Bites Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website or purchase of products. Our total liability for any claim shall not exceed the amount paid by you for the relevant product(s).",
      "**Governing Law:** These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  returns: {
    title: "Returns & Refund Policy",
    content: [
      `Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "At D-Bites, we want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, we offer a straightforward returns and refund process in compliance with UK consumer protection laws.",
      "**Your Right to Cancel:** Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you have 14 calendar days from the day after you receive your goods to cancel your order. You do not need to give a reason for cancellation. To exercise this right, please contact us at hello@dbites.co.uk with your order number and reason for return.",
      "**Return Conditions:** Products must be returned in their original, unopened, and unused condition with all seals intact. All packaging must be included. Perishable goods that have been opened or used cannot be returned for food safety reasons, unless they are faulty. We recommend using a tracked delivery service and keeping proof of postage, as we cannot be held responsible for items lost in transit during return.",
      "**Faulty or Incorrect Items:** If you receive a faulty, damaged, or incorrect item, please contact us within 48 hours of delivery with photographs of the issue. We will arrange a replacement or full refund, including return shipping costs. We take quality control very seriously and will investigate any issues promptly.",
      "**Refund Process:** Once we receive your returned goods and confirm they meet our return conditions, we will process your refund within 14 calendar days. Refunds will be issued to the original payment method used for the purchase. Please allow 3-5 additional business days for the refund to appear in your account, depending on your payment provider.",
      "**Non-Returnable Items:** Due to food safety regulations, we cannot accept returns of opened or used food products (unless faulty). Gift cards, promotional items, and personalised products are also non-returnable. If you have concerns about a product, please contact us before opening it.",
      "**Exchanges:** We currently do not offer direct exchanges. If you would like a different product, please return the original item(s) for a refund and place a new order. We are happy to provide advice on product selection if you are unsure.",
      "**Contact:** For all returns and refund queries, please email returns@dbites.co.uk or call us at +44 20 7946 0958 during business hours (Mon-Sat, 9am-6pm GMT).",
    ],
  },
  shipping: {
    title: "Shipping Information",
    content: [
      `Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
      "We aim to deliver your D-Bites order as quickly and safely as possible. Below you will find all the information you need about our UK delivery options, timescales, and charges.",
      "**Delivery Options:** We currently deliver to all addresses within the United Kingdom (England, Scotland, Wales, and Northern Ireland). We offer two delivery options: Standard Delivery, which takes 3-5 business days and costs £3.99 (FREE on orders over £30), and Express Delivery, which takes 1-2 business days and costs £5.99. Orders placed before 2pm GMT on business days will be processed the same day. Orders placed after 2pm or on weekends/bank holidays will be processed the next business day.",
      "**Free Delivery:** We offer free Standard Delivery on all orders over £30. This threshold applies to the order subtotal before delivery charges. The free delivery offer applies automatically at checkout — no promo code needed. Unfortunately, free delivery does not apply to Express Delivery upgrades.",
      "**Order Tracking:** Once your order has been dispatched, you will receive a confirmation email with a tracking number and a link to track your parcel in real time. You can use this to see the current status and estimated delivery date. If you have an account, you can also view your order status and tracking information in your order history.",
      "**Packaging:** All D-Bites products are carefully packaged to ensure they arrive in perfect condition. We use eco-friendly packaging wherever possible, including recyclable cardboard boxes and biodegradable packing materials. Our packaging is designed to protect the quality and freshness of our dehydrated fruits during transit.",
      "**Delivery Issues:** If your delivery is delayed beyond the estimated timeframe, please allow an additional 2 business days before contacting us, as courier delays can occasionally occur. If your parcel is lost or significantly delayed, please contact us at hello@dbites.co.uk with your order number and we will investigate immediately. If your order arrives damaged, please see our Returns & Refund Policy for information on how to report the issue.",
      "**International Delivery:** At this time, we only deliver within the United Kingdom. We are actively working on expanding our delivery options to the EU and other international destinations. If you are based outside the UK and would like to be notified when international shipping becomes available, please sign up for our newsletter.",
      "**Collection (Click & Collect):** We are currently developing a Click & Collect option for customers who would like to collect their orders from our mobile locations. This service will be available soon — follow us on social media for announcements.",
      "**Contact:** For any shipping-related queries, please contact us at shipping@dbites.co.uk or call +44 20 7946 0958.",
    ],
  },
};

export function LegalPages() {
  const { ui, setPage } = useStore();
  const page = ui.legalPage || "privacy";
  const content = legalContent[page];

  if (!content) return null;

  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => setPage("home")}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </button>

        <h1 className="text-3xl font-bold">{content.title}</h1>

        <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
          {content.content.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="font-semibold text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  part
                )
              )}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {Object.keys(legalContent).map((key) => (
            <Button
              key={key}
              variant={page === key ? "default" : "outline"}
              size="sm"
              onClick={() => useStore.getState().setLegalPage(key as typeof page)}
              className={`rounded-full ${
                page === key
                  ? "bg-accent text-white hover:bg-accent/90"
                  : ""
              }`}
            >
              {legalContent[key].title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
