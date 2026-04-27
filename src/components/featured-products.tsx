'use client'

import { useStore } from '@/lib/store'
import ProductCard from './product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = ['All', 'Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic']

export default function FeaturedProducts() {
  const { products } = useStore()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const { setCurrentView } = useStore()

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Bestsellers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
          <div className="text-center py-12 text-muted-foreground">
            <p>Loading products...</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" onClick={() => setCurrentView('shop')}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
