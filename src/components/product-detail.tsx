'use client'

import { useStore, type Product } from '@/lib/store'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Star, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ProductDetail() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore()
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct)
    }
    toast.success(`${quantity}x ${selectedProduct.name} added to cart!`)
    setSelectedProduct(null)
    setQuantity(1)
  }

  return (
    <Dialog open={!!selectedProduct} onOpenChange={() => { setSelectedProduct(null); setQuantity(1) }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <span className="text-[120px] md:text-[160px]">{selectedProduct.image}</span>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <Badge variant="secondary" className="w-fit mb-3">
              {selectedProduct.category}
            </Badge>

            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {selectedProduct.weight}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {selectedProduct.description}
            </p>

            <Separator className="my-3" />

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Ingredients</h4>
              <p className="text-sm text-muted-foreground">{selectedProduct.ingredients}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Weight</h4>
              <p className="text-sm text-muted-foreground">{selectedProduct.weight}</p>
            </div>

            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'} - ${(selectedProduct.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
