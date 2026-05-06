'use client'

import { useStore, type Product } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle2, Loader2, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, getCartTotal, clearCart, setOrderPlaced, orderPlaced, setOrderNumber, orderNumber, user, setLoginModalOpen, setUserOrders } = useStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user && checkoutOpen) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user, checkoutOpen])

  const total = getCartTotal()
  const tax = total * 0.08
  const grandTotal = total + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total: grandTotal,
          userId: user?.id || null,
          items: cart.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
          })),
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setOrderNumber(data.orderId)
        setOrderPlaced(true)
        clearCart()
        toast.success('Order placed successfully!')
        // Refresh user orders
        if (user) {
          try {
            const ordersRes = await fetch('/api/auth/me')
            if (ordersRes.ok) {
              const ordersData = await ordersRes.json()
              setUserOrders(ordersData.orders)
            }
          } catch { /* silent */ }
        }
      } else {
        toast.error(data.error || 'Failed to place order')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setCheckoutOpen(false)
    if (orderPlaced) {
      setOrderPlaced(false)
      if (!user) {
        setFormData({ name: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '' })
      }
    }
  }

  return (
    <Dialog open={checkoutOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {orderPlaced ? 'Order Confirmed!' : 'Checkout'}
          </DialogTitle>
        </DialogHeader>

        {orderPlaced ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Thank you for your order!</h3>
            <p className="text-sm text-muted-foreground">
              Your order has been placed successfully. We&apos;ll send a confirmation to your email.
            </p>
            <div className="bg-muted rounded-lg p-4 mt-2">
              <p className="text-xs text-muted-foreground">Order Number</p>
              <p className="text-lg font-mono font-semibold text-primary">{orderNumber}</p>
            </div>
            <Button onClick={handleClose} className="mt-4 bg-primary hover:bg-primary/90 text-white">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Login prompt for guest users */}
            {!user && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                <User className="h-5 w-5 text-orange-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-foreground/60">Have an account?</p>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false)
                      setLoginModalOpen(true)
                    }}
                    className="text-sm font-bold text-orange-600 hover:text-orange-700"
                  >
                    Sign in for faster checkout
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">Address *</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm">City *</Label>
                <Input
                  id="city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="ST"
                />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <Label htmlFor="zipCode" className="text-sm">Zip Code *</Label>
                <Input
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="12345"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Order Summary</h4>
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" size="lg" disabled={loading || cart.length === 0}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Place Order - $${grandTotal.toFixed(2)}`
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
