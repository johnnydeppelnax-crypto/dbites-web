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

const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
  Tropical: { bg: 'bg-orange-100/80', text: 'text-orange-700', gradient: 'from-orange-500 to-amber-500' },
  Berries: { bg: 'bg-rose-100/80', text: 'text-rose-700', gradient: 'from-rose-500 to-pink-500' },
  Citrus: { bg: 'bg-yellow-100/80', text: 'text-amber-700', gradient: 'from-yellow-500 to-orange-500' },
  Exotic: { bg: 'bg-purple-100/80', text: 'text-purple-700', gradient: 'from-purple-500 to-violet-500' },
  Classic: { bg: 'bg-emerald-100/80', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-500' },
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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border border-orange-100/60 bg-white/90 backdrop-blur-sm card-lift rounded-2xl"
        onClick={() => setSelectedProduct(product)}
      >
        {/* Product Image with tropical gradient overlay */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-orange-50 to-cyan-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Tropical gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 shadow-lg shadow-orange-500/25 text-xs font-bold px-3 py-1">
                Featured
              </Badge>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className={`${colors.bg} ${colors.text} border border-white/50 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm`}>
              {product.category}
            </span>
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full bg-white/95 backdrop-blur-sm text-foreground hover:bg-white shadow-lg border border-orange-200/30 rounded-xl font-semibold"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-sm font-bold bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-sm line-clamp-1 group-hover:text-orange-600 transition-colors mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-foreground/50 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className={`text-lg font-black bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-foreground/40 ml-1">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100/50">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-700">{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
