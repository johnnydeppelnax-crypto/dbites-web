'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const { setCurrentView } = useStore()

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(217, 119, 6, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.1) 0%, transparent 50%)`
      }} />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 select-none">🥭</div>
      <div className="absolute top-20 right-20 text-5xl opacity-10 select-none">🍍</div>
      <div className="absolute bottom-10 left-1/4 text-4xl opacity-10 select-none">🍎</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-10 select-none">🫐</div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Premium Dehydrated Fruits
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Nature&apos;s Best,{' '}
            <span className="text-primary">Perfectly Preserved</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            D-Bites is a mobile social hub designed to elevate the street-side
            dining experience. We bring the sophistication of a high-end lounge
            to premium dehydrated fruits and gourmet snacks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-base px-8"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-base px-8"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/40 max-w-lg mx-auto"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Natural</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
