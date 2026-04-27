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
import Footer from '@/components/footer'
import CartDrawer from '@/components/cart-drawer'
import CheckoutModal from '@/components/checkout-modal'
import ProductDetail from '@/components/product-detail'

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function Home() {
  const { currentView, setProducts, products } = useStore()

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        // Try to seed first
        await fetch('/api/seed', { method: 'POST' })

        // Then fetch all products
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

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background logo watermark */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/dbites-logo.png"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-auto object-contain opacity-[0.025] select-none"
        />
      </div>

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
      </div>
    </div>
  )
}
