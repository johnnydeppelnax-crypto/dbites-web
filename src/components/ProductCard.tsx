"use client";

import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, setSelectedProduct, setPage, ui } = useStore();
  const [liked, setLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleProductClick = () => {
    setSelectedProduct(product);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleProductClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className={`relative h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        <span className="text-7xl drop-shadow-lg transition-transform group-hover:scale-110">
          {product.emoji}
        </span>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-accent backdrop-blur-sm">
              Featured
            </span>
          )}
          <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-primary backdrop-blur-sm">
            {product.category}
          </span>
        </div>

        {/* Actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors ${
              liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            }`}
          >
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-md transition-transform hover:scale-110"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.shortDesc}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              £{product.price.toFixed(2)}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
              / {product.weight}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="mt-3 w-full rounded-full bg-accent text-white hover:bg-accent/90"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
