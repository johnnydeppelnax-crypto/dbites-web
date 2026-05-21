'use client'

import { useStore } from '@/lib/store'
import ProductCard from './product-card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function FeaturedProducts() {
  const { products } = useStore()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const { setCurrentView } = useStore()

  return (
    <section className="py-20 md:py-28 bg-tropical-gradient relative overflow-hidden">
      {/* Lightweight floating fruit accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -left-10 animate-float-gentle-1">
          <span className="text-4xl md:text-6xl opacity-18 select-none" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute -bottom-8 -right-10 animate-float-gentle-2">
          <span className="text-5xl md:text-7xl opacity-15 select-none" role="img" aria-label="lemon">🍋</span>
        </div>
        <div className="absolute top-1/3 right-[2%] animate-float-gentle-3 hidden lg:block">
          <span className="text-3xl opacity-20 select-none" role="img" aria-label="lime">🍈</span>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">Customer Favorites</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-5">
            Our <span className="gradient-text">Bestsellers</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed text-lg">
            Discover our most loved dehydrated fruits — each one carefully crafted
            to deliver the purest tropical flavor.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {featured.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-foreground/50 font-medium">Loading delicious products...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            onClick={() => setCurrentView('shop')}
            className="px-10 py-6 text-sm bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 rounded-2xl font-bold border-0"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
