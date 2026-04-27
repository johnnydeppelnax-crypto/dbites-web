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

const categoryStyles: Record<string, { bg: string; text: string; gradient: string }> = {
  Tropical: { bg: 'bg-amber-500', text: 'text-amber-50', gradient: 'from-amber-100 via-yellow-50 to-orange-100' },
  Berries: { bg: 'bg-pink-500', text: 'text-pink-50', gradient: 'from-pink-100 via-rose-50 to-red-50' },
  Citrus: { bg: 'bg-orange-500', text: 'text-orange-50', gradient: 'from-orange-100 via-amber-50 to-yellow-100' },
  Exotic: { bg: 'bg-violet-500', text: 'text-violet-50', gradient: 'from-violet-100 via-purple-50 to-fuchsia-50' },
  Classic: { bg: 'bg-emerald-500', text: 'text-emerald-50', gradient: 'from-emerald-100 via-green-50 to-teal-50' },
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setSelectedProduct } = useStore()
  const styles = categoryStyles[product.category] || categoryStyles.Classic

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product)
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)} · ${product.weight}`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card
        className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card"
        onClick={() => setSelectedProduct(product)}
      >
        <div className="relative">
          {/* Image area with category-matched gradient */}
          <div className={`aspect-square bg-gradient-to-br ${styles.gradient} flex items-center justify-center relative overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/15" />
            
            <span className="text-7xl md:text-8xl group-hover:scale-125 transition-transform duration-700 ease-out drop-shadow-lg">
              {product.image}
            </span>

            {/* Featured badge */}
            {product.featured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md text-xs font-semibold px-3 py-1">
                  ⭐ Featured
                </Badge>
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 right-3">
              <span className={`${styles.bg} ${styles.text} text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm`}>
                {product.category}
              </span>
            </div>

            {/* Quick add overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button
                className="w-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white shadow-lg border-0"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-semibold bg-gray-800 text-white px-4 py-2 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground ml-1.5">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-700">{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
