"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/90 p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Stay Updated 🌴
          </h2>
          <p className="mx-auto mt-2 max-w-md text-white/80">
            Get the latest on new products, special offers, and our daily
            locations.
          </p>

          {subscribed ? (
            <p className="mt-6 font-semibold text-tropical-light">
              🎉 Thanks for subscribing!
            </p>
          ) : (
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <Input
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className="rounded-full border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/40"
              />
              <Button
                onClick={handleSubscribe}
                className="rounded-full bg-accent px-6 font-semibold text-white hover:bg-accent/90"
              >
                Subscribe
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
