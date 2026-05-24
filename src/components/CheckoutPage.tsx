"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Smartphone,
  Lock,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  Loader2,
  Apple,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CheckoutPage() {
  const { cart, setPage, clearCart, setOrder, auth, setLoginOpen } = useStore();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCost =
    deliveryOption === "express"
      ? 5.99
      : subtotal >= 30
        ? 0
        : 3.99;
  const total = subtotal + deliveryCost;

  const [form, setForm] = useState({
    fullName: "",
    phone: auth.phone || "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    if (!auth.isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const orderNum = "DB-" + Date.now().toString(36).toUpperCase();
      setOrder(orderNum);
      clearCart();
      setPage("confirmation");
      setProcessing(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl">🛒</span>
        <h2 className="mt-4 text-xl font-bold">Your cart is empty</h2>
        <p className="mt-1 text-muted-foreground">
          Add some items before checking out
        </p>
        <Button
          onClick={() => setPage("shop")}
          className="mt-4 rounded-full bg-accent text-white hover:bg-accent/90"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <button
          onClick={() => setPage("shop")}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </button>

        <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping */}
            <div className="rounded-2xl border border-border/50 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Truck className="h-5 w-5 text-accent" />
                Shipping Information
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Full Name *</Label>
                  <Input
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="John Smith"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+44 7XXX XXX XXX"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="john@example.com"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Address Line 1 *</Label>
                  <Input
                    value={form.address1}
                    onChange={(e) => updateField("address1", e.target.value)}
                    placeholder="123 High Street"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Address Line 2</Label>
                  <Input
                    value={form.address2}
                    onChange={(e) => updateField("address2", e.target.value)}
                    placeholder="Flat 4, Building B"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label>City *</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="London"
                    className="mt-1 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Postcode *</Label>
                  <Input
                    value={form.postcode}
                    onChange={(e) => updateField("postcode", e.target.value)}
                    placeholder="SW1A 1AA"
                    className="mt-1 rounded-xl"
                  />
                </div>
              </div>

              {/* Delivery options */}
              <h3 className="mt-6 mb-3 font-semibold">Delivery Option</h3>
              <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-2">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    deliveryOption === "standard"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="standard" />
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        3-5 business days
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">
                    {subtotal >= 30 ? "FREE" : "£3.99"}
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    deliveryOption === "express"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="express" />
                    <div>
                      <p className="font-medium">Express Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        1-2 business days
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold">£5.99</span>
                </label>
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-border/50 bg-white p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CreditCard className="h-5 w-5 text-accent" />
                Payment Method
              </h2>

              <div className="mt-4 space-y-3">
                {/* Card */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === "card"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="accent-accent"
                  />
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Credit / Debit Card</span>
                  <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-[10px]">VISA</Badge>
                    <Badge variant="outline" className="text-[10px]">MC</Badge>
                    <Badge variant="outline" className="text-[10px]">AMEX</Badge>
                  </div>
                </label>

                {/* Apple Pay */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === "apple"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "apple"}
                    onChange={() => setPaymentMethod("apple")}
                    className="accent-accent"
                  />
                  <Apple className="h-5 w-5" />
                  <span className="font-medium">Apple Pay</span>
                </label>

                {/* Google Pay */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === "google"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "google"}
                    onChange={() => setPaymentMethod("google")}
                    className="accent-accent"
                  />
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Google Pay</span>
                </label>

                {/* PayPal */}
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                    paymentMethod === "paypal"
                      ? "border-accent bg-accent/5"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="accent-accent"
                  />
                  <span className="text-lg font-bold text-blue-600">P</span>
                  <span className="font-medium">PayPal</span>
                </label>
              </div>

              {/* Card form */}
              {paymentMethod === "card" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <Label>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={(e) =>
                        updateField(
                          "cardNumber",
                          e.target.value
                            .replace(/\D/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim()
                            .slice(0, 19)
                        )
                      }
                      className="mt-1 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label>Cardholder Name</Label>
                    <Input
                      placeholder="John Smith"
                      value={form.cardName}
                      onChange={(e) => updateField("cardName", e.target.value)}
                      className="mt-1 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={form.expiry}
                        onChange={(e) =>
                          updateField(
                            "expiry",
                            e.target.value
                              .replace(/\D/g, "")
                              .replace(/(\d{2})(\d)/, "$1/$2")
                              .slice(0, 5)
                          )
                        }
                        className="mt-1 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input
                        type="password"
                        placeholder="123"
                        value={form.cvv}
                        onChange={(e) =>
                          updateField(
                            "cvv",
                            e.target.value.replace(/\D/g, "").slice(0, 3)
                          )
                        }
                        className="mt-1 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <Shield className="h-4 w-4" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <RotateCcw className="h-4 w-4" />
                  Free Returns
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <span>🇬🇧</span>
                  UK Based
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border/50 bg-white p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.product.gradient}`}
                    >
                      <span className="text-xl">{item.product.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className={deliveryCost === 0 ? "text-green-600 font-medium" : ""}>
                    {deliveryCost === 0 ? "FREE" : `£${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">£{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={processing}
                className="mt-6 w-full rounded-xl bg-accent py-5 text-base font-semibold text-white hover:bg-accent/90 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order — £{total.toFixed(2)}
                  </>
                )}
              </Button>

              {!auth.isAuthenticated && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  You&apos;ll need to sign in to complete your order
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
