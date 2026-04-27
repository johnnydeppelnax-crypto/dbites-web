'use client'

import { useStore, type ViewType } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Instagram, Facebook, Twitter, Heart, ArrowRight, Leaf } from 'lucide-react'

const footerLinks: { label: string; view: ViewType }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Shop', view: 'shop' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
]

export default function Footer() {
  const { setCurrentView } = useStore()

  return (
    <footer className="relative bg-foreground text-white mt-auto overflow-hidden">
      {/* Subtle organic gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Background logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src="/dbites-logo.png" alt="" className="w-[400px] h-auto object-contain opacity-[0.03] brightness-0 invert select-none" />
      </div>

      {/* 3D floating fruits in footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '800px' }}>
        <div className="absolute top-8 left-[5%] animate-float3d-1">
          <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-10">
            <img src="/products/mango.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.5)' }} />
          </div>
        </div>
        <div className="absolute bottom-8 right-[8%] animate-float3d-3">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-10">
            <img src="/products/berries.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.5)' }} />
          </div>
        </div>
        <div className="absolute top-1/2 right-[2%] animate-float3d-2 hidden lg:block">
          <div className="fruit-3d w-12 h-12 rounded-full overflow-hidden opacity-8">
            <img src="/products/apple.png" alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.3) saturate(0.5)' }} />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img
                src="/dbites-logo.png"
                alt="D-Bites Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              A mobile social hub designed to elevate the street-side dining
              experience with premium dehydrated fruits and gourmet snacks.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Instagram, hover: 'hover:bg-white/10' },
                { icon: Facebook, hover: 'hover:bg-white/10' },
                { icon: Twitter, hover: 'hover:bg-white/10' },
              ].map((social, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white/40 transition-all duration-300 ${social.hover} hover:text-white`}
                >
                  <social.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-white/80 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => {
                      setCurrentView(link.view)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-5 text-white/80 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              {['Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCurrentView('shop')
                      useStore.getState().setSelectedCategory(cat)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-5 text-white/80 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-white/40 mb-4">
              Get the latest on new products, special offers, and our daily locations.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm rounded-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} D-Bites. All rights reserved.
          </p>
          <p className="text-sm text-white/30 flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by D-Bites
          </p>
        </div>
      </div>
    </footer>
  )
}
