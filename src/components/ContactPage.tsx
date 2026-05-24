"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-6xl">📩</span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Get in Touch</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@dbites.co.uk" },
                { icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 Tropical Lane, London, UK, SW1A 1AA",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Mon-Sat: 9am - 6pm GMT",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-primary p-5 text-white">
              <h3 className="font-semibold">Follow Us</h3>
              <p className="mt-1 text-sm text-white/70">
                Stay connected for the latest updates, behind-the-scenes, and
                exclusive offers.
              </p>
              <div className="mt-3 flex gap-2">
                {["📘 Facebook", "📸 Instagram", "🐦 Twitter", "📌 Pinterest"].map(
                  (social) => (
                    <Button
                      key={social}
                      variant="secondary"
                      size="sm"
                      className="rounded-full text-xs"
                    >
                      {social}
                    </Button>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border/50 bg-white p-6">
              <h2 className="text-lg font-semibold">Send us a Message</h2>

              {sent ? (
                <div className="mt-8 text-center">
                  <span className="text-4xl">🎉</span>
                  <p className="mt-3 font-semibold">Message Sent!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 rounded-full"
                    onClick={() => setSent(false)}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Your Name</label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Smith"
                      className="mt-1 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="mt-1 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="How can we help?"
                      rows={5}
                      className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="w-full rounded-xl bg-accent py-5 font-semibold text-white hover:bg-accent/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
