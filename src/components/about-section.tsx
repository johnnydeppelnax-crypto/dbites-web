'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function AboutSection() {
  const { setCurrentView } = useStore()

  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* 3D floating fruits background */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute top-16 right-[10%] animate-float3d-1">
          <div className="fruit-3d w-24 h-24 rounded-full overflow-hidden opacity-20 fruit-3d-shine border border-white/40">
            <img src="/products/pineapple.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-20 left-[8%] animate-float3d-3">
          <div className="fruit-3d w-20 h-20 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/coconut.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-1/2 -right-4 animate-float3d-spin hidden lg:block">
          <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-20 fruit-3d-shine border border-white/50">
            <img src="/products/dragonfruit.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[2%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-15 fruit-3d-shine border border-white/40">
            <img src="/products/banana.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side - with 3D floating fruit accents */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/products/mango.png"
                  alt="D-Bites Premium Dehydrated Mango"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3D floating accent image - top right */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotateY: [0, 10, 0], rotateX: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d fruit-shadow w-24 h-24 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img src="/products/berries.png" alt="Berries" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* 3D floating accent - bottom left */}
              <motion.div
                animate={{ y: [4, -8, 4], rotateY: [0, -8, 0], rotateX: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d fruit-shadow w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img src="/products/kiwi.png" alt="Kiwi" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* 3D spinning fruit - top left */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-8 hidden lg:block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-70 border-2 border-white shadow-md">
                  <img src="/products/apple.png" alt="Apple" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-lg border border-border/50 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs text-muted-foreground">All Natural</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-accent tracking-widest uppercase mb-3 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              The <span className="gradient-text">D-Bites</span> Experience
            </h2>

            <p className="text-muted-foreground mb-5 leading-relaxed text-lg">
              D-Bites was born from a simple yet powerful vision: to elevate the
              street-side dining experience with premium dehydrated fruits and gourmet
              snacks. We saw a gap in the market for sophisticated, on-the-go refreshments
              that didn&apos;t compromise on quality or taste.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              As a mobile social hub, we bring the sophistication of a high-end lounge
              directly to the streets. Our unique fusion of premium snacks and a modern,
              upbeat atmosphere creates a dining experience unlike any other. Whether it is
              a quick refresh or a social gathering, D-Bites delivers &ldquo;the best
              taste&rdquo; through quality ingredients and an unwavering commitment to
              excellence.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { icon: Heart, label: 'Made with Love', color: 'text-rose-500', bg: 'bg-rose-50' },
                { icon: Users, label: 'Community First', color: 'text-orange-500', bg: 'bg-orange-50' },
                { icon: Globe, label: 'Sustainable', color: 'text-green-500', bg: 'bg-green-50' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentView('shop')}
              className="px-8 py-5 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
