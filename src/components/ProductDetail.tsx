"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Minus, Plus, X, ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetail() {
  const { ui, setSelectedProduct, addToCart } = useStore();
  const product = ui.selectedProduct;
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        >
          {/* Close */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Image */}
            <div
              className={`flex h-64 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient} sm:h-80`}
            >
              <span className="text-9xl drop-shadow-xl">{product.emoji}</span>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {product.featured && (
                  <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-6">
                <span className="text-3xl font-bold text-primary">
                  £{product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-muted-foreground">/ {product.weight}</span>
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQty(qty + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                  setSelectedProduct(null);
                  setQty(1);
                }}
                className="mt-6 w-full rounded-full bg-accent py-6 text-base font-semibold text-white hover:bg-accent/90"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart — £{(product.price * qty).toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-8 border-t border-border/50 pt-6">
              <h3 className="mb-4 font-semibold">You May Also Like</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {related.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setQty(1);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-border/50 p-3 text-left transition-colors hover:bg-muted/50"
                  >
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.gradient}`}
                    >
                      <span className="text-2xl">{p.emoji}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-accent font-semibold">
                        £{p.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
