'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function AboutSection() {
  const { setCurrentView } = useStore()

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="text-[120px]">🥭</div>
              <div className="absolute top-8 right-8 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🍎</div>
              <div className="absolute bottom-12 left-8 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🫐</div>
              <div className="absolute top-1/2 right-4 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>🍍</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-primary">Story</span>
            </h2>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              D-Bites was born from a simple yet powerful vision: to elevate the
              street-side dining experience with premium dehydrated fruits and gourmet
              snacks. We saw a gap in the market for sophisticated, on-the-go refreshments
              that didn&apos;t compromise on quality or taste.
            </p>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              As a mobile social hub, we bring the sophistication of a high-end lounge
              directly to the streets. Our unique fusion of premium snacks and a modern,
              upbeat atmosphere creates a dining experience unlike any other. Whether it is
              a quick refresh or a social gathering, D-Bites delivers &ldquo;the best
              taste&rdquo; through quality ingredients and an unwavering commitment to
              excellence.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Every fruit we dehydrate is hand-selected from trusted farms, processed
              without preservatives, and packaged with care. We believe that great food
              should be accessible, convenient, and always made with love.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Made with Love</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Community First</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Sustainable</span>
              </div>
            </div>

            <Button onClick={() => setCurrentView('shop')}>
              Explore Our Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
