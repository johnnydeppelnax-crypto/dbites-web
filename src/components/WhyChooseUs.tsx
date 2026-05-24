"use client";

import { products, categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { Star, Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    emoji: "🍈",
    title: "100% Natural",
    desc: "Every fruit is naturally dehydrated without artificial preservatives, colors, or flavors. Pure fruit goodness in every bite.",
  },
  {
    emoji: "🥭",
    title: "No Preservatives",
    desc: "Our dehydration process preserves freshness naturally. Clean eating without harmful additives or hidden ingredients.",
  },
  {
    emoji: "🫐",
    title: "Premium Quality",
    desc: "Only the finest, freshest fruits make the cut. Hand-selected from trusted farms for exceptional quality and taste.",
  },
  {
    emoji: "🍉",
    title: "Mobile Fresh",
    desc: "As a mobile social hub, D-Bites brings premium snacks directly to you. Fresh, convenient, and always ready.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Our Promise
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose D-Bites?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            We deliver the finest dehydrated fruits with an unwavering focus on
            quality, freshness, and your well-being.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border/50 bg-cream p-6 text-center transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                {feature.emoji}
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
