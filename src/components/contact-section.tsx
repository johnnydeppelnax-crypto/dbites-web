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
  {
    icon: MapPin,
    title: 'Location',
    description: 'Mobile Lounge — Find us on the streets!\nFollow our socials for daily locations.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Phone,
    title: 'Phone',
    description: '(555) 123-4567',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'hello@d-bites.com',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Clock,
    title: 'Hours',
    description: 'Mon – Fri: 10am – 8pm\nSat – Sun: 11am – 9pm',
    gradient: 'from-rose-400 to-pink-500',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Message sent! We\'ll get back to you soon. 🎉')
    setFormData({ name: '', email: '', message: '' })
    setLoading(false)
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-amber-50/40 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Have questions about our products, catering services, or want to book
            D-Bites for your event? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-sm font-medium">Message</Label>
                  <Textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shrink-0 shadow-md`}>
                  <info.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{info.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {info.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, gradient: 'from-pink-500 to-rose-500' },
                  { icon: Facebook, gradient: 'from-blue-500 to-blue-600' },
                  { icon: Twitter, gradient: 'from-sky-400 to-blue-500' },
                ].map((social, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl hover:border-transparent transition-all duration-300 group overflow-hidden relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <social.icon className="h-5 w-5 relative z-10 group-hover:text-white transition-colors duration-300" />
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
