'use client'

import { useStore } from '@/lib/store'
import { ShoppingCart, Menu, X, Sun } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full">
      {/* Glass morphism tropical header */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-orange-50/60 to-cyan-50/60 backdrop-blur-xl border-b border-orange-200/30" />
      
      <div className="relative container mx-auto flex h-18 items-center justify-between px-4">
        {/* Logo with tropical accent */}
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2.5 transition-transform hover:scale-105"
        >
          <div className="relative">
            <img
              src="/dbites-logo.png"
              alt="D-Bites Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
        </button>

        {/* Desktop Nav - tropical pills */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-orange-200/30 shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`relative px-6 py-2 text-sm font-semibold transition-all duration-300 rounded-full ${
                currentView === item.view
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(true)}
            className="relative hover:bg-orange-50 transition-colors rounded-xl"
          >
            <ShoppingCart className="h-5 w-5 text-foreground/70" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-bold text-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-orange-50 rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav - tropical style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-orange-200/30 bg-gradient-to-b from-white/95 via-orange-50/30 to-cyan-50/30 backdrop-blur-xl"
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
                  className={`py-3.5 text-base font-semibold text-left transition-colors border-b border-orange-100/50 last:border-0 ${
                    currentView === item.view
                      ? 'text-orange-600'
                      : 'text-foreground/50'
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
