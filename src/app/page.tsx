'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

import Header from '@/components/header'
import Hero from '@/components/hero'
import FeaturedProducts from '@/components/featured-products'
import WhyDBites from '@/components/why-dbites'
import ProductCatalog from '@/components/product-catalog'
import AboutSection from '@/components/about-section'
import ContactSection from '@/components/contact-section'
import AdminDashboard from '@/components/admin-dashboard'
import AccountPage from '@/components/account-page'
import Footer from '@/components/footer'
import CartDrawer from '@/components/cart-drawer'
import CheckoutModal from '@/components/checkout-modal'
import ProductDetail from '@/components/product-detail'
import LoginModal from '@/components/login-modal'
import FloatingFruits from '@/components/floating-fruits'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function Home() {
  const { currentView, setProducts, products, user, setUser, setAuthLoading, setUserOrders } = useStore()
  const isAdminView = currentView === 'admin'
  const isAccountView = currentView === 'account'
  const isUserAdmin = user?.role === 'admin'

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        await fetch('/api/seed', { method: 'POST' })
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (error) {
        console.error('Failed to load products:', error)
      }
    }
    loadProducts()
  }, [setProducts])

  // Check session on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session')
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setUser(data.user)
            // Load user orders
            const ordersRes = await fetch('/api/auth/me')
            if (ordersRes.ok) {
              const ordersData = await res.json()
              setUserOrders(ordersData.orders)
            }
          }
        }
      } catch {
        // silently fail
      } finally {
        setAuthLoading(false)
      }
    }
    checkSession()
  }, [setUser, setAuthLoading, setUserOrders])

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed, app still works
      })
    }
  }, [])

  // Admin view — only accessible by admin users
  if (isAdminView) {
    // Non-admin users are redirected to home
    if (user && !isUserAdmin) {
      setCurrentView('home')
    }
    // Not logged in — prompt sign in
    if (!user) {
      return (
        <div className="min-h-screen">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-3">Admin Access Required</h2>
              <p className="text-foreground/60 mb-6">Please sign in with an admin account to access this page.</p>
              <Button onClick={() => useStore.getState().setLoginModalOpen(true)} className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl px-6 py-3">
                Sign In
              </Button>
            </div>
          </div>
          <LoginModal />
        </div>
      )
    }
    // Admin user — show dashboard
    if (isUserAdmin) {
      return (
        <div className="min-h-screen">
          <Header />
          <AdminDashboard />
          <CartDrawer />
          <CheckoutModal />
          <ProductDetail />
          <LoginModal />
        </div>
      )
    }
  }

  // Account view
  if (isAccountView) {
    return (
      <div className="min-h-screen">
        <Header />
        <AccountPage />
        <Footer />
        <CartDrawer />
        <CheckoutModal />
        <ProductDetail />
        <LoginModal />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Global subtle floating fruits background — lazy loaded, SSR disabled */}
      <FloatingFruits variant="full" />

      <div className="relative z-10 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <Hero />
              <FeaturedProducts />
              <WhyDBites />
            </motion.div>
          )}

          {currentView === 'shop' && (
            <motion.div
              key="shop"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <ProductCatalog />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <AboutSection />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductDetail />
      <LoginModal />
      </div>
    </div>
  )
}
