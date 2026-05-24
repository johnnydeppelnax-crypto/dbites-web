"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { ui, setCartOpen, cart, updateQuantity, removeFromCart, setPage, clearCart } =
    useStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 30 ? 0 : 3.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {ui.cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[91] flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-sm font-medium text-accent hover:underline"
              >
                Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                  <h3 className="mt-4 text-lg font-semibold">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add some tropical goodness!
                  </p>
                  <Button
                    onClick={() => {
                      setPage("shop");
                      setCartOpen(false);
                    }}
                    className="mt-4 rounded-full bg-accent text-white hover:bg-accent/90"
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 rounded-xl border border-border/50 p-3"
                    >
                      {/* Image */}
                      <div
                        className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.product.gradient}`}
                      >
                        <span className="text-2xl">{item.product.emoji}</span>
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm font-bold text-accent">
                            £{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full border text-xs hover:bg-muted"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full border text-xs hover:bg-muted"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `£${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal < 30 && (
                    <p className="text-xs text-muted-foreground">
                      Add £{(30 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setCartOpen(false);
                    setPage("checkout");
                  }}
                  className="mt-4 w-full rounded-full bg-accent py-5 text-base font-semibold text-white hover:bg-accent/90"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    setPage("shop");
                  }}
                  className="mt-2 w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
