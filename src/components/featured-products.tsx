'use client'

import { useStore } from '@/lib/store'
import ProductCard from './product-card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FeaturedProducts() {
  const { products } = useStore()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const { setCurrentView } = useStore()

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* 3D background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Customer Favorites
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
            Our <span className="gradient-text">Bestsellers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most popular dehydrated fruits, handpicked for their
            exceptional flavor and quality. Each bite is a taste of perfection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {featured.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading delicious products...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCurrentView('shop')}
            className="px-10 py-6 text-base border-2 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 rounded-xl shadow-3d"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
