'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Message sent! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
    setLoading(false)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-amber-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions about our products, catering services, or want to book
            D-Bites for your event? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Location</h4>
                <p className="text-sm text-muted-foreground">
                  Mobile Lounge — Find us on the streets!<br />
                  Follow our socials for daily locations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Phone</h4>
                <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <p className="text-sm text-muted-foreground">hello@d-bites.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Mon – Fri: 10am – 8pm<br />
                  Sat – Sun: 11am – 9pm
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
