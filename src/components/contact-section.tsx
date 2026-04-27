'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const contactInfo = [
  { icon: MapPin, title: 'Location', description: 'Mobile Lounge — Find us on the streets!\nFollow our socials for daily locations.', gradient: 'from-orange-500 to-amber-500', bg: 'from-orange-50 to-amber-50' },
  { icon: Phone, title: 'Phone', description: '(555) 123-4567', gradient: 'from-emerald-500 to-teal-500', bg: 'from-emerald-50 to-teal-50' },
  { icon: Mail, title: 'Email', description: 'hello@d-bites.com', gradient: 'from-purple-500 to-violet-500', bg: 'from-purple-50 to-violet-50' },
  { icon: Clock, title: 'Hours', description: 'Mon – Fri: 10am – 8pm\nSat – Sun: 11am – 9pm', gradient: 'from-cyan-500 to-blue-500', bg: 'from-cyan-50 to-blue-50' },
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
    <section className="py-20 md:py-28 bg-tropical-warm relative overflow-hidden">
      {/* Prominent 3D floating fruits */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute top-20 -left-8 animate-drift-slow">
          <div className="fruit-3d-prominent w-28 h-28 md:w-44 md:h-44 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute bottom-16 -right-10 animate-drift-medium">
          <div className="fruit-3d-prominent w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute top-1/2 left-[2%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/40">
            <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
        <div className="absolute bottom-1/3 right-[3%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-25 fruit-3d-shine border border-white/40">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-5">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed text-lg">
            Have questions about our products, catering services, or want to book
            D-Bites for your event? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200/40 shadow-lg">
              <h3 className="text-lg font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-semibold">Name</Label>
                  <Input id="contact-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="border-orange-200/50 focus:border-orange-400 bg-white/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-semibold">Email</Label>
                  <Input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="border-orange-200/50 focus:border-orange-400 bg-white/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-sm font-semibold">Message</Label>
                  <Textarea id="contact-message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us how we can help..." className="border-orange-200/50 focus:border-orange-400 resize-none bg-white/60" />
                </div>
                <Button type="submit" className="w-full py-6 btn-tropical text-white shadow-lg shadow-orange-500/20 transition-all duration-300 rounded-2xl font-bold border-0" disabled={loading}>
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : <Send className="mr-2 h-4 w-4" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div key={info.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-start gap-4 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-200/30 hover:border-orange-300/50 transition-colors duration-300 hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                  <info.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">{info.title}</h4>
                  <p className="text-sm text-foreground/50 whitespace-pre-line leading-relaxed">{info.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="pt-4">
              <h4 className="font-bold text-sm mb-3">Follow Us</h4>
              <div className="flex gap-2">
                {[
                  { icon: Instagram, gradient: 'from-orange-500 to-rose-500', hoverBg: 'hover:bg-gradient-to-br hover:from-orange-50 hover:to-rose-50' },
                  { icon: Facebook, gradient: 'from-blue-500 to-cyan-500', hoverBg: 'hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50' },
                  { icon: Twitter, gradient: 'from-sky-500 to-cyan-500', hoverBg: 'hover:bg-gradient-to-br hover:from-sky-50 hover:to-cyan-50' },
                ].map((social, i) => (
                  <Button key={i} variant="outline" size="icon" className={`h-11 w-11 rounded-xl transition-all duration-300 border-orange-200/30 ${social.hoverBg}`}>
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
