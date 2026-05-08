'use client'

import { useStore, type Product } from '@/lib/store'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, Minus, Plus, ShoppingBag, Leaf, Flame } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const categoryColors: Record<string, { bg: string; text: string }> = {
  Tropical: { bg: 'bg-orange-50', text: 'text-orange-700' },
  Berries: { bg: 'bg-rose-50', text: 'text-rose-700' },
  Citrus: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Exotic: { bg: 'bg-violet-50', text: 'text-violet-700' },
  Classic: { bg: 'bg-green-50', text: 'text-green-700' },
  Mixes: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
}

export default function ProductDetail() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) return null

  const colors = categoryColors[selectedProduct.category] || categoryColors.Classic

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct)
    }
    toast.success(`${quantity}x ${selectedProduct.name} added to cart!`, {
      description: `Total: $${(selectedProduct.price * quantity).toFixed(2)}`,
    })
    setSelectedProduct(null)
    setQuantity(1)
  }

  return (
    <Dialog open={!!selectedProduct} onOpenChange={() => { setSelectedProduct(null); setQuantity(1) }}>
      <DialogContent className="sm:max-w-3xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto p-0 border-0 shadow-xl rounded-2xl sm:rounded-2xl rounded-none inset-0 sm:inset-auto w-full sm:w-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square md:aspect-auto max-h-[40vh] md:max-h-none relative overflow-hidden bg-stone-50">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            {/* Mobile: close-friendly category badge */}
            <div className="absolute top-3 left-3 md:hidden">
              <Badge variant="secondary" className={`text-xs font-medium ${colors.bg} ${colors.text}`}>
                {selectedProduct.category}
              </Badge>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col">
            <Badge variant="secondary" className={`w-fit mb-3 text-xs font-medium ${colors.bg} ${colors.text} hidden md:inline-flex`}>
              {selectedProduct.category}
            </Badge>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">{selectedProduct.name}</h2>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium">{selectedProduct.rating}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">({selectedProduct.reviewCount})</span>
            </div>

            <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl font-bold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                / {selectedProduct.weight}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 leading-relaxed line-clamp-3 md:line-clamp-none">
              {selectedProduct.description}
            </p>

            {/* Natural / No preservative badges */}
            <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5">
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-green-50">
                <Leaf className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-600" />
                <span className="text-[10px] sm:text-xs font-medium text-green-700">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-orange-50">
                <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-600" />
                <span className="text-[10px] sm:text-xs font-medium text-orange-700">No Preservatives</span>
              </div>
            </div>

            <Separator />

            <div className="mt-3 sm:mt-4 mb-3 sm:mb-4">
              <h4 className="text-xs sm:text-sm font-semibold mb-1">Ingredients</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">{selectedProduct.ingredients}</p>
            </div>

            <div className="mt-auto space-y-3 sm:space-y-4 pt-3 sm:pt-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs sm:text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-7 sm:w-7 rounded-full hover:bg-white shadow-sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 sm:h-7 sm:w-7 rounded-full hover:bg-white shadow-sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full py-4 sm:py-5 text-sm bg-primary hover:bg-primary/90 text-white shadow-md transition-all duration-300 rounded-xl"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'} — ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
