"use client";

import { useStore } from "@/lib/store";

const footerLinks = {
  quickLinks: [
    { label: "Home", page: "home" as const },
    { label: "Shop", page: "shop" as const },
    { label: "About", page: "about" as const },
    { label: "Contact", page: "contact" as const },
  ],
  categories: ["Tropical", "Berries", "Citrus", "Exotic", "Classic", "Mixes"],
  legal: [
    { label: "Privacy Policy", page: "privacy" as const },
    { label: "Terms & Conditions", page: "terms" as const },
    { label: "Returns & Refunds", page: "returns" as const },
    { label: "Shipping Info", page: "shipping" as const },
  ],
};

export function Footer() {
  const { setPage, setLegalPage, ui } = useStore();

  const handleLegalClick = (page: "privacy" | "terms" | "returns" | "shipping") => {
    setLegalPage(page);
    setPage("legal");
  };

  return (
    <footer className="relative mt-auto border-t border-border/50 bg-primary text-primary-foreground">
      {/* Wave top */}
      <div className="absolute -top-12 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
            fill="#2D5016"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🥭</span>
              <span className="text-xl font-bold">
                D-<span className="text-tropical-light">Bites</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70">
              A mobile social hub designed to elevate the street-side dining
              experience with premium dehydrated fruits and gourmet snacks.
            </p>
            <div className="mt-4 flex gap-3">
              {["📘", "📸", "🐦", "📌"].map((icon, i) => (
                <button
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-accent"
                >
                  <span className="text-sm">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-tropical-light">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setPage(link.page)}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-tropical-light">
              Categories
            </h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setPage("shop")}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-tropical-light">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleLegalClick(item.page)}
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} D-Bites. All rights reserved.</p>
          <p className="mt-1">
            Made with 🥭 in the United Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
