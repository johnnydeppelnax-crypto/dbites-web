"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dbites-cookie-consent");
    if (!consent) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("dbites-cookie-consent", "accepted");
    setShow(false);
  };

  const handleCustomize = () => {
    localStorage.setItem("dbites-cookie-consent", "customized");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[110] p-4 sm:bottom-4 sm:left-4 sm:right-4 sm:mx-auto sm:max-w-lg"
        >
          <div className="rounded-2xl border border-border/50 bg-white p-5 shadow-xl">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Cookie className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">We use cookies 🍪</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  We use cookies to improve your browsing experience, analyse site
                  traffic, and personalise content. By clicking &quot;Accept
                  All&quot;, you consent to our use of cookies in accordance with
                  our Privacy Policy.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Button
                    onClick={handleCustomize}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                  >
                    Customize
                  </Button>
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    className="rounded-full bg-accent text-xs text-white hover:bg-accent/90"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
