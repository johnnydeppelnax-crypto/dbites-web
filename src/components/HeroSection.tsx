"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

const floatingFruits = [
  { emoji: "🍍", className: "animate-float", style: { top: "10%", left: "5%" } },
  { emoji: "🍊", className: "animate-float-delayed", style: { top: "20%", right: "8%" } },
  { emoji: "🫛", className: "animate-float-slow", style: { bottom: "25%", left: "10%" } },
  { emoji: "🥭", className: "animate-float", style: { bottom: "15%", right: "5%" } },
  { emoji: "🍋", className: "animate-float-delayed", style: { top: "50%", left: "2%" } },
  { emoji: "🍈", className: "animate-float-slow", style: { top: "60%", right: "3%" } },
  { emoji: "🍉", className: "animate-float", style: { top: "40%", left: "15%" } },
  { emoji: "🫐", className: "animate-float-delayed", style: { bottom: "40%", right: "12%" } },
];

export function HeroSection() {
  const { setPage } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-orange-50/30 to-green-50/20 px-4 py-16 sm:py-24 lg:py-32">
      {/* Floating fruits */}
      <div className="pointer-events-none absolute inset-0">
        {floatingFruits.map((fruit, i) => (
          <span
            key={i}
            className={`absolute text-4xl opacity-20 sm:text-5xl lg:text-6xl ${fruit.className}`}
            style={fruit.style}
          >
            {fruit.emoji}
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            <span>☀️</span> Summer Vibes Are Here
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          >
            Taste The{" "}
            <span className="bg-gradient-to-r from-accent to-tropical-dark bg-clip-text text-transparent">
              Tropical
            </span>
            <br />
            Sunshine
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            D-Bites brings you premium dehydrated fruits bursting with tropical
            flavor. From our mobile lounge to your hands — every bite is a
            vacation for your taste buds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              onClick={() => setPage("shop")}
              size="lg"
              className="rounded-full bg-accent px-8 text-base font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent/90"
            >
              Summer Deals 🌴
            </Button>
            <Button
              onClick={() => setPage("about")}
              variant="outline"
              size="lg"
              className="rounded-full border-primary/20 px-8 text-base font-semibold"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-6 sm:gap-12"
          >
            {[
              { value: "32+", label: "Tropical Flavors" },
              { value: "100%", label: "All Natural" },
              { value: "5K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
