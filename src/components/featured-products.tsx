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
      {/* Prominent 3D floating fruits */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute -top-8 -left-10 animate-drift-slow">
          <div className="fruit-3d-prominent w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden opacity-30 fruit-3d-shine">
            <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute -bottom-8 -right-10 animate-drift-medium">
          <div className="fruit-3d-prominent w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute top-1/3 right-[2%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d w-22 h-22 rounded-full overflow-hidden opacity-35 fruit-3d-shine border border-white/50">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[3%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/40">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute top-[10%] right-[25%] animate-splash-bounce hidden xl:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-25 fruit-3d-shine border border-white/40">
            <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
          transition={{ duration: 0.5, delay: 0.3 }}
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
