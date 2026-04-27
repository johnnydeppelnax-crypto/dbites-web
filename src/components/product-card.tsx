'use client'

import { useStore, type Product } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import TiltCard from './tilt-card'

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
      <TiltCard maxTilt={12} scale={1.02} className="rounded-2xl">
        <Card
          className="group cursor-pointer overflow-hidden border-0 shadow-3d shadow-3d-hover transition-all duration-300 bg-card rounded-2xl"
          onClick={() => setSelectedProduct(product)}
        >
          <div className="relative">
            {/* Image area with 3D depth */}
            <div className={`aspect-square bg-gradient-to-br ${styles.gradient} flex items-center justify-center relative overflow-hidden`}>
              {/* 3D shadow layer behind the fruit */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
              
              {/* Decorative 3D circles */}
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/20 shadow-inner" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/15 shadow-inner" />
              
              {/* 3D floating fruit emoji */}
              <div className="relative">
                <span className="text-7xl md:text-8xl group-hover:scale-125 transition-transform duration-700 ease-out drop-shadow-2xl filter">
                  {product.image}
                </span>
                {/* 3D reflection/shadow under fruit */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 rounded-[50%] blur-sm" />
              </div>

              {/* Featured badge with 3D pop */}
              {product.featured && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg shadow-amber-500/30 text-xs font-semibold px-3 py-1">
                    ⭐ Featured
                  </Badge>
                </div>
              )}

              {/* Category badge */}
              <div className="absolute top-3 right-3">
                <span className={`${styles.bg} ${styles.text} text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md`}>
                  {product.category}
                </span>
              </div>

              {/* Quick add overlay with 3D slide-up */}
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  className="w-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white shadow-lg border-0 rounded-xl"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-sm font-semibold bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg">Out of Stock</span>
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
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full shadow-sm">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-700">{product.rating}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TiltCard>
    </motion.div>
  )
}
