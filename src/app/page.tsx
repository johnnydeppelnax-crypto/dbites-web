"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/HeroSection";
import { Bestsellers } from "@/components/Bestsellers";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Newsletter } from "@/components/Newsletter";
import { ShopPage } from "@/components/ShopPage";
import { CheckoutPage } from "@/components/CheckoutPage";
import { OrderConfirmation } from "@/components/OrderConfirmation";
import { CartDrawer } from "@/components/CartDrawer";
import { CookieConsent } from "@/components/CookieConsent";
import { AboutPage } from "@/components/AboutPage";
import { ContactPage } from "@/components/ContactPage";
import { LegalPages } from "@/components/LegalPages";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function PageContent() {
  const { ui } = useStore();

  switch (ui.currentPage) {
    case "shop":
      return <ShopPage />;
    case "checkout":
      return <CheckoutPage />;
    case "confirmation":
      return <OrderConfirmation />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "legal":
      return <LegalPages />;
    default:
      return (
        <>
          <HeroSection />
          <Bestsellers />
          <WhyChooseUs />
          <Newsletter />
        </>
      );
  }
}

export default function Home() {
  const { setPage } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [useStore((s) => s.ui.currentPage)]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Header />
      <main className="flex-1">
        <PageContent />
      </main>
      <Footer />
      <CartDrawer />
      <CookieConsent />
    </div>
  );
}
