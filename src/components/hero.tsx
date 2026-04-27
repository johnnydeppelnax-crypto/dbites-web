'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, ChevronDown } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const { setCurrentView } = useStore()
  const ref = useRef(null)

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[92vh] flex items-center bg-white">
      {/* Soft organic background shapes */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-50/60 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-3xl" />

      {/* Background logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src="/dbites-logo.png"
          alt=""
          className="w-[500px] md:w-[700px] h-auto object-contain opacity-[0.04] select-none"
        />
      </div>

      {/* Hero fruit image - large, textured, organic */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/products/hero-fruits.png"
            alt="D-Bites Premium Dehydrated Fruits"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30" />
        </div>
      </div>

      {/* Floating fruit accents */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[8%] hidden lg:block"
      >
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg shadow-orange-200/50 border-2 border-white">
          <img src="/products/mango.png" alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [6, -10, 6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] hidden lg:block"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-green-200/50 border-2 border-white">
          <img src="/products/kiwi.png" alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [-5, 10, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] right-[5%] hidden xl:block"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-red-200/50 border-2 border-white">
          <img src="/products/berries.png" alt="" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium mb-8 text-green-700">
              <Leaf className="h-3.5 w-3.5" />
              100% Natural &bull; No Preservatives
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.08]"
          >
            Nature&apos;s Best,{' '}
            <span className="gradient-text">Perfectly</span>
            <br />
            Preserved
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
          >
            D-Bites brings you premium dehydrated fruits — pure, vibrant, and
            bursting with flavor. From our mobile lounge to your hands, every
            bite is nature perfected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-base px-8 py-6 border-border hover:bg-muted transition-all duration-300 rounded-xl"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-8 mt-14 pt-8 border-t border-border/60"
          >
            {[
              { value: '12+', label: 'Products' },
              { value: '100%', label: 'Natural' },
              { value: '5K+', label: 'Happy Customers' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
