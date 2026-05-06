'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { AnimatePresence, motion } from 'framer-motion'

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
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function Home() {
  const { currentView, setProducts, products, user, setUser, setAuthLoading, setUserOrders } = useStore()
  const isAdmin = currentView === 'admin'
  const isAccount = currentView === 'account'

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
              const ordersData = await ordersRes.json()
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

  // Admin view has its own full-page layout
  if (isAdmin) {
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

  // Account view
  if (isAccount) {
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
      {/* Global subtle 3D floating fruits background */}
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
              transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
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
              transition={{ duration: 0.3 }}
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
