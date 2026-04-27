'use client'

import { useStore, type ViewType } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react'

const footerLinks: { label: string; view: ViewType }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Shop', view: 'shop' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
]

export default function Footer() {
  const { setCurrentView } = useStore()

  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img
                src="/dbites-logo.png"
                alt="D-Bites Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              A mobile social hub designed to elevate the street-side dining
              experience with premium dehydrated fruits and gourmet snacks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => {
                      setCurrentView(link.view)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Categories</h4>
            <ul className="space-y-2">
              {['Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCurrentView('shop')
                      useStore.getState().setSelectedCategory(cat)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-sm text-background/60 hover:text-primary transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-background/90">Stay Updated</h4>
            <p className="text-sm text-background/60 mb-3">
              Get the latest on new products and locations.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="your@email.com"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40"
              />
              <Button size="sm" className="shrink-0">
                Join
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            &copy; {new Date().getFullYear()} D-Bites. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-background/50 hover:text-primary hover:bg-background/10">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-background/50 hover:text-primary hover:bg-background/10">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-background/50 hover:text-primary hover:bg-background/10">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-background/50 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> by D-Bites
          </p>
        </div>
      </div>
    </footer>
  )
}
