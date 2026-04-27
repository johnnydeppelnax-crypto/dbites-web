'use client'

import { useStore, type Product } from '@/lib/store'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, Minus, Plus, ShoppingBag, Leaf, Flame } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const categoryGradients: Record<string, string> = {
  Tropical: 'from-amber-100 via-yellow-50 to-orange-100',
  Berries: 'from-pink-100 via-rose-50 to-red-50',
  Citrus: 'from-orange-100 via-amber-50 to-yellow-100',
  Exotic: 'from-violet-100 via-purple-50 to-fuchsia-50',
  Classic: 'from-emerald-100 via-green-50 to-teal-50',
}

export default function ProductDetail() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) return null

  const gradient = categoryGradients[selectedProduct.category] || categoryGradients.Classic

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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className={`aspect-square md:aspect-auto bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/20" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/15" />
            <div className="absolute top-1/2 right-0 w-24 h-24 rounded-full bg-white/10" />
            
            <span className="text-[100px] md:text-[140px] drop-shadow-lg">{selectedProduct.image}</span>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col">
            <Badge variant="secondary" className="w-fit mb-4 text-xs font-semibold">
              {selectedProduct.category}
            </Badge>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{selectedProduct.name}</h2>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{selectedProduct.rating}</span>
              <span className="text-sm text-muted-foreground">({selectedProduct.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-4xl font-extrabold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {selectedProduct.weight}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50">
                <Leaf className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-orange-50">
                <Flame className="h-4 w-4 text-orange-600" />
                <span className="text-xs font-medium text-orange-700">No Preservatives</span>
              </div>
            </div>

            <Separator className="my-1" />

            <div className="mt-4 mb-4">
              <h4 className="text-sm font-semibold mb-1.5">Ingredients</h4>
              <p className="text-sm text-muted-foreground">{selectedProduct.ingredients}</p>
            </div>

            <div className="mt-auto space-y-5 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">Quantity</span>
                <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-background"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-background"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full py-6 text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'} — ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
