"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function OrderConfirmation() {
  const { order, setPage } = useStore();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDate = deliveryDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-bold sm:text-3xl">Order Confirmed! 🎉</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your order. We&apos;re getting your tropical treats ready!
        </p>

        <div className="mt-8 rounded-2xl border border-border/50 bg-white p-6 text-left">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-bold text-accent">
                {order.orderNumber || "DB-XXXXXX"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium">
                {order.orderDate ||
                  new Date().toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Delivery</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          A confirmation email will be sent to your email address
        </div>

        <Button
          onClick={() => setPage("shop")}
          className="mt-8 rounded-full bg-accent px-8 py-5 text-base font-semibold text-white hover:bg-accent/90"
        >
          Continue Shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
