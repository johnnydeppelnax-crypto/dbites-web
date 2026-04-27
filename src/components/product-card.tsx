'use client'

import { useStore, type Product } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Plus, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
  index?: number
}

const categoryColors: Record<string, string> = {
  Tropical: 'bg-amber-100 text-amber-800',
  Berries: 'bg-pink-100 text-pink-800',
  Citrus: 'bg-orange-100 text-orange-800',
  Exotic: 'bg-purple-100 text-purple-800',
  Classic: 'bg-green-100 text-green-800',
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setSelectedProduct } = useStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        onClick={() => setSelectedProduct(product)}
      >
        <div className="relative">
          {/* Image placeholder with gradient */}
          <div className="aspect-square bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
            <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-500">
              {product.image}
            </span>
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                Featured
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quick add button */}
          <Button
            size="icon"
            className="absolute bottom-3 right-3 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
            <Badge variant="secondary" className={`text-[10px] shrink-0 ${categoryColors[product.category] || ''}`}>
              {product.category}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground ml-1">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
