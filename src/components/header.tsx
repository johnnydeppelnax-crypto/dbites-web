'use client'

import { useStore } from '@/lib/store'
import { ShoppingCart, Menu, X, Sun, LayoutDashboard, User, LogOut, Package, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import type { ViewType } from '@/lib/store'
import { useState, useRef, useEffect } from 'react'

const navItems: { label: string; view: ViewType }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Shop', view: 'shop' },
  { label: 'About', view: 'about' },
  { label: 'Contact', view: 'contact' },
  { label: 'Admin', view: 'admin' },
]

export default function Header() {
  const {
    currentView, setCurrentView, setCartOpen, getCartItemCount,
    mobileMenuOpen, setMobileMenuOpen, user, setUser,
    setLoginModalOpen, setUserOrders
  } = useStore()
  const cartCount = getCartItemCount()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      setUserOrders([])
      setUserMenuOpen(false)
    } catch {
      // silently fail
    }
  }

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
              {item.view === 'admin' ? <LayoutDashboard className="h-3.5 w-3.5 mr-1" /> : null}{item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
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

          {/* User button */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 hover:shadow-md transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-semibold text-foreground/70 max-w-[80px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className={`h-3 w-3 text-foreground/30 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl border border-orange-100 shadow-xl shadow-orange-500/5 overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
                      <p className="font-bold text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-foreground/40">{user.email}</p>
                    </div>

                    <div className="p-1.5">
                      <button
                        onClick={() => {
                          setCurrentView('account')
                          setUserMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-orange-50 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('account')
                          setUserMenuOpen(false)
                          // Set to orders tab
                          useStore.getState().setAdminTab('orders')
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-orange-50 transition-colors"
                      >
                        <Package className="h-4 w-4" />
                        My Orders
                      </button>
                    </div>

                    <div className="border-t border-orange-100 p-1.5">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              onClick={() => setLoginModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 px-5 h-9 text-sm"
            >
              <User className="h-4 w-4 mr-1.5" />
              Sign In
            </Button>
          )}

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

              {/* Mobile user section */}
              {user ? (
                <>
                  <button
                    onClick={() => {
                      setCurrentView('account')
                      setMobileMenuOpen(false)
                    }}
                    className="py-3.5 text-base font-semibold text-left text-orange-600 flex items-center gap-2 border-b border-orange-100/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="py-3.5 text-base font-semibold text-left text-red-500 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setLoginModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="py-3.5 text-base font-semibold text-left text-orange-600 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
