'use client'

import { useStore } from '@/lib/store'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import type { ViewType } from '@/lib/store'

const navItems: { label: string; view: ViewType }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Shop', view: 'shop' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
]

export default function Header() {
  const { currentView, setCurrentView, setCartOpen, getCartItemCount, mobileMenuOpen, setMobileMenuOpen } = useStore()
  const cartCount = getCartItemCount()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img
            src="/dbites-logo.png"
            alt="D-Bites Logo"
            className="h-11 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                currentView === item.view
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(true)}
            className="relative hover:bg-amber-50 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[10px] font-bold text-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl"
          >
            <nav className="container mx-auto flex flex-col py-3 px-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.view}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setCurrentView(item.view)
                    setMobileMenuOpen(false)
                  }}
                  className={`py-3.5 text-base font-medium text-left transition-colors border-b border-border/10 last:border-0 ${
                    currentView === item.view
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
