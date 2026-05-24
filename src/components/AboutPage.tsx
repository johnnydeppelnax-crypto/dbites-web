"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export function AboutPage() {
  const { setPage } = useStore();

  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl">🥭</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Our Story</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            From tropical orchards to your doorstep
          </p>
        </motion.div>

        <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold text-foreground">How It All Started</h2>
            <p className="mt-3">
              D-Bites was born from a simple love for tropical fruits and a desire
              to share that passion with the world. Founded in the heart of the
              United Kingdom, we started as a mobile social hub — bringing premium
              dehydrated fruits directly to communities, events, and street
              markets across the country. Our mission has always been the same:
              to elevate the snacking experience with 100% natural, premium
              quality dried fruits that taste like sunshine.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-foreground">Our Process</h2>
            <p className="mt-3">
              Every D-Bites product starts with hand-selected fruits from trusted
              farms around the world. We work directly with growers who share our
              commitment to quality and sustainability. Each fruit is carefully
              dehydrated at controlled temperatures to preserve its natural
              sweetness, vibrant color, and nutritional goodness. No artificial
              preservatives, no added sugars, no shortcuts — just pure fruit,
              done right.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-foreground">Our Promise</h2>
            <p className="mt-3">
              We believe that snacking should be a guilt-free pleasure. That&apos;s
              why every D-Bites product is 100% natural, with no preservatives,
              artificial colors, or hidden ingredients. We&apos;re committed to
              transparency, quality, and bringing you the finest dehydrated fruits
              from around the world. From our mobile lounge to your hands — every
              bite is a vacation for your taste buds.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { emoji: "🌍", value: "15+", label: "Countries Sourced" },
              { emoji: "🥭", value: "38", label: "Unique Products" },
              { emoji: "❤️", value: "5,000+", label: "Happy Customers" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="rounded-xl border border-border/50 bg-white p-6 text-center"
              >
                <span className="text-3xl">{stat.emoji}</span>
                <div className="mt-2 text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => setPage("shop")}
            className="rounded-full bg-accent px-8 font-semibold text-white hover:bg-accent/90"
          >
            Explore Our Products 🌴
          </Button>
        </div>
      </div>
    </div>
  );
}
