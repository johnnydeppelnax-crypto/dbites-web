"use client";

import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Bestsellers() {
  const { setPage, setCartOpen, addToCart } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Customer Favorites
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Our Bestsellers
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Discover our most loved dehydrated fruits — each one carefully
            crafted to deliver the purest tropical flavor.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Button
            onClick={() => setPage("shop")}
            variant="outline"
            size="lg"
            className="rounded-full px-8 font-semibold"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
