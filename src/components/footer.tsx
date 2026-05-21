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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto overflow-hidden">
      {/* Tropical gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-purple-500" />

      {/* Lightweight floating fruit accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-8 left-[4%] animate-float-gentle-1">
          <span className="text-3xl opacity-[0.08] select-none" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute bottom-8 right-[6%] animate-float-gentle-2">
          <span className="text-2xl opacity-[0.08] select-none" role="img" aria-label="lemon">🍋</span>
        </div>
        <div className="absolute top-1/2 right-[1%] animate-float-gentle-3 hidden lg:block">
          <span className="text-xl opacity-[0.06] select-none" role="img" aria-label="orange">🍊</span>
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
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              A mobile social hub designed to elevate the street-side dining
              experience with premium dehydrated fruits and gourmet snacks.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Instagram, gradient: 'hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-rose-500/20' },
                { icon: Facebook, gradient: 'hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20' },
                { icon: Twitter, gradient: 'hover:bg-gradient-to-br hover:from-sky-500/20 hover:to-cyan-500/20' },
              ].map((social, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white/30 transition-all duration-300 ${social.gradient} hover:text-white`}
                >
                  <social.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-white/70 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => {
                      setCurrentView(link.view)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group"
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
            <h4 className="font-bold mb-5 text-white/70 text-xs uppercase tracking-widest">Categories</h4>
            <ul className="space-y-3">
              {['Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCurrentView('shop')
                      useStore.getState().setSelectedCategory(cat)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-2 group"
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
            <h4 className="font-bold mb-5 text-white/70 text-xs uppercase tracking-widest">Stay Updated</h4>
            <p className="text-sm text-white/30 mb-4">
              Get the latest on new products, special offers, and our daily locations.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/15 focus:border-orange-500/50"
              />
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-500/20 rounded-xl font-bold border-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/20">
            &copy; {new Date().getFullYear()} D-Bites. All rights reserved.
          </p>
          <p className="text-sm text-white/20 flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-orange-500 fill-orange-500" /> by D-Bites
          </p>
        </div>
      </div>
    </footer>
  )
}
