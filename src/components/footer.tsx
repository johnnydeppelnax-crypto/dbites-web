'use client'

import { useStore, type ViewType } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Instagram, Facebook, Twitter, Heart, ArrowRight } from 'lucide-react'

const footerLinks: { label: string; view: ViewType }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Shop', view: 'shop' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
]

export default function Footer() {
  const { setCurrentView } = useStore()

  return (
    <footer className="relative bg-gradient-to-br from-amber-950 via-orange-950 to-amber-950 text-amber-100 mt-auto overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img
                src="/dbites-logo.png"
                alt="D-Bites Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-amber-200/50 leading-relaxed mb-6">
              A mobile social hub designed to elevate the street-side dining
              experience with premium dehydrated fruits and gourmet snacks.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, color: 'hover:bg-pink-500/20 hover:text-pink-300' },
                { icon: Facebook, color: 'hover:bg-blue-500/20 hover:text-blue-300' },
                { icon: Twitter, color: 'hover:bg-sky-500/20 hover:text-sky-300' },
              ].map((social, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-amber-200/50 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-5 text-amber-100/90 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => {
                      setCurrentView(link.view)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-amber-200/50 hover:text-amber-300 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-5 text-amber-100/90 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              {[
                { cat: 'Tropical', emoji: '🌴' },
                { cat: 'Berries', emoji: '🫐' },
                { cat: 'Citrus', emoji: '🍊' },
                { cat: 'Exotic', emoji: '🐉' },
                { cat: 'Classic', emoji: '🍎' },
              ].map((item) => (
                <li key={item.cat}>
                  <button
                    onClick={() => {
                      setCurrentView('shop')
                      useStore.getState().setSelectedCategory(item.cat)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-amber-200/50 hover:text-amber-300 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {item.emoji} {item.cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-5 text-amber-100/90 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-amber-200/50 mb-4">
              Get the latest on new products, special offers, and our daily locations.
            </p>
            <div className="space-y-3">
              <Input
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-amber-100 placeholder:text-amber-200/30 focus:border-amber-500/50"
              />
              <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-amber-200/40">
            &copy; {new Date().getFullYear()} D-Bites. All rights reserved.
          </p>
          <p className="text-sm text-amber-200/40 flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> by D-Bites
          </p>
        </div>
      </div>
    </footer>
  )
}
