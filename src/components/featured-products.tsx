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
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* 3D floating fruits background */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <div className="absolute top-10 -left-8 animate-float3d-2">
          <div className="fruit-3d w-20 h-20 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/mango.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-10 -right-6 animate-float3d-1">
          <div className="fruit-3d w-24 h-24 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/berries.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-1/2 right-[3%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-20 fruit-3d-shine border border-white/50">
            <img src="/products/apple.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-[20%] left-[5%] animate-float3d-spin hidden md:block">
          <div className="fruit-3d w-12 h-12 rounded-full overflow-hidden opacity-15 fruit-3d-shine border border-white/40">
            <img src="/products/kiwi.png" alt="" className="w-full h-full object-cover" />
          </div>
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
          <span className="text-sm font-medium text-accent tracking-widest uppercase mb-3 block">
            Customer Favorites
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Our <span className="gradient-text">Bestsellers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Discover our most loved dehydrated fruits — each one carefully crafted
            to deliver the purest flavor and finest texture.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {featured.length === 0 && (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Loading delicious products...</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCurrentView('shop')}
            className="px-8 py-5 text-sm border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
