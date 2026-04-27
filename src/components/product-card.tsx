'use client'

import { useStore, type Product } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  index?: number
}

const categoryColors: Record<string, { bg: string; text: string; accent: string }> = {
  Tropical: { bg: 'bg-orange-50', text: 'text-orange-700', accent: 'border-orange-200' },
  Berries: { bg: 'bg-rose-50', text: 'text-rose-700', accent: 'border-rose-200' },
  Citrus: { bg: 'bg-amber-50', text: 'text-amber-700', accent: 'border-amber-200' },
  Exotic: { bg: 'bg-violet-50', text: 'text-violet-700', accent: 'border-violet-200' },
  Classic: { bg: 'bg-green-50', text: 'text-green-700', accent: 'border-green-200' },
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setSelectedProduct } = useStore()
  const colors = categoryColors[product.category] || categoryColors.Classic

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)} · ${product.weight}`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border border-border/60 bg-white card-lift rounded-2xl"
        onClick={() => setSelectedProduct(product)}
      >
        {/* Product Image - clean, texture-focused */}
        <div className="relative aspect-square overflow-hidden bg-stone-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/95 text-primary border border-primary/20 shadow-sm text-xs font-semibold px-3 py-1 backdrop-blur-sm">
                Featured
              </Badge>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className={`${colors.bg} ${colors.text} ${colors.accent} border text-[10px] font-semibold px-2.5 py-1 rounded-full`}>
              {product.category}
            </span>
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full bg-white/95 backdrop-blur-sm text-foreground hover:bg-white shadow-lg border border-border/30 rounded-xl"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-semibold bg-foreground text-white px-4 py-2 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground ml-1">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-amber-700">{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
