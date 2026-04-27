'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Send } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const contactInfo = [
  { icon: MapPin, title: 'Location', description: 'Mobile Lounge — Find us on the streets!\nFollow our socials for daily locations.', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { icon: Phone, title: 'Phone', description: '(555) 123-4567', color: 'text-green-600', bgColor: 'bg-green-50' },
  { icon: Mail, title: 'Email', description: 'hello@d-bites.com', color: 'text-violet-600', bgColor: 'bg-violet-50' },
  { icon: Clock, title: 'Hours', description: 'Mon – Fri: 10am – 8pm\nSat – Sun: 11am – 9pm', color: 'text-amber-600', bgColor: 'bg-amber-50' },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! We'll get back to you soon.")
    setFormData({ name: '', email: '', message: '' })
    setLoading(false)
  }

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* 3D floating fruits background */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute top-20 -left-6 animate-float3d-1">
          <div className="fruit-3d w-24 h-24 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/mango.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-16 -right-8 animate-float3d-3">
          <div className="fruit-3d w-20 h-20 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/orange.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-1/2 left-[3%] animate-float3d-spin hidden lg:block">
          <div className="fruit-3d w-12 h-12 rounded-full overflow-hidden opacity-20 fruit-3d-shine border border-white/40">
            <img src="/products/passionfruit.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-[4%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-15 fruit-3d-shine border border-white/50">
            <img src="/products/pear.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Have questions about our products, catering services, or want to book
            D-Bites for your event? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="p-8 rounded-2xl bg-white border border-border/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium">Name</Label>
                  <Input id="contact-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="border-border/50 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium">Email</Label>
                  <Input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="border-border/50 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-sm font-medium">Message</Label>
                  <Textarea id="contact-message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us how we can help..." className="border-border/50 focus:border-primary resize-none" />
                </div>
                <Button type="submit" className="w-full py-5 bg-primary hover:bg-primary/90 text-white shadow-sm transition-all duration-300 rounded-xl" disabled={loading}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/50 hover:border-primary/20 transition-colors duration-300">
                <div className={`w-10 h-10 rounded-lg ${info.bgColor} flex items-center justify-center shrink-0`}>
                  <info.icon className={`h-5 w-5 ${info.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-0.5">{info.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{info.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="pt-4">
              <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { icon: Instagram, hoverBg: 'hover:bg-orange-50 hover:text-orange-600' },
                  { icon: Facebook, hoverBg: 'hover:bg-blue-50 hover:text-blue-600' },
                  { icon: Twitter, hoverBg: 'hover:bg-sky-50 hover:text-sky-600' },
                ].map((social, i) => (
                  <Button key={i} variant="outline" size="icon" className={`h-10 w-10 rounded-lg transition-all duration-300 ${social.hoverBg}`}>
                    <social.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
