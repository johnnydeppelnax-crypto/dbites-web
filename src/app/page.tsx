"use client";

import { Header } from "@/components/dbites/Header";
import { Footer } from "@/components/dbites/Footer";
import { HeroSection } from "@/components/dbites/HeroSection";
import { Bestsellers } from "@/components/dbites/Bestsellers";
import { WhyChooseUs } from "@/components/dbites/WhyChooseUs";
import { Newsletter } from "@/components/dbites/Newsletter";
import { ShopPage } from "@/components/dbites/ShopPage";
import { CheckoutPage } from "@/components/dbites/CheckoutPage";
import { OrderConfirmation } from "@/components/dbites/OrderConfirmation";
import { CartDrawer } from "@/components/dbites/CartDrawer";
import { CookieConsent } from "@/components/dbites/CookieConsent";
import { AboutPage } from "@/components/dbites/AboutPage";
import { ContactPage } from "@/components/dbites/ContactPage";
import { LegalPages } from "@/components/dbites/LegalPages";
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
