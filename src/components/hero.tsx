'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Leaf, ChevronDown } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const { setCurrentView } = useStore()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 160])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 40])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[95vh] flex items-center bg-white">
      {/* Soft organic background shapes */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-orange-50/60 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* ===== 3D FLOATING FRUITS - Background layer (far, faded) ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>

        {/* Far layer - large, faded, slow */}
        <motion.div style={{ y: y2 }} className="absolute -top-10 -left-10 animate-float3d-2">
          <div className="fruit-3d w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden opacity-20 fruit-3d-shine">
            <img src="/products/pineapple.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute -bottom-10 -right-10 animate-float3d-1">
          <div className="fruit-3d w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden opacity-15 fruit-3d-shine">
            <img src="/products/orange.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute top-1/4 right-[5%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d w-36 h-36 rounded-full overflow-hidden opacity-20 fruit-3d-shine">
            <img src="/products/coconut.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Mid layer - medium size, moderate opacity */}
        <motion.div style={{ y: y1 }} className="absolute top-[8%] left-[8%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden opacity-40 fruit-3d-shine border-2 border-white/60">
            <img src="/products/mango.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[5%] right-[18%] animate-float3d-3 hidden md:block">
          <div className="fruit-3d fruit-shadow w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden opacity-35 fruit-3d-shine border-2 border-white/60">
            <img src="/products/apple.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[15%] left-[5%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d fruit-shadow w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden opacity-30 fruit-3d-shine border-2 border-white/50">
            <img src="/products/berries.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Near layer - smaller, vivid, fast */}
        <motion.div style={{ y: y3 }} className="absolute top-[18%] left-[35%] animate-float3d-spin hidden lg:block">
          <div className="fruit-3d fruit-shadow w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden opacity-50 fruit-3d-shine border border-white/80">
            <img src="/products/kiwi.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute bottom-[25%] right-[8%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden opacity-45 fruit-3d-shine border border-white/70">
            <img src="/products/dragonfruit.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[55%] left-[2%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d fruit-shadow w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden opacity-40 fruit-3d-shine border border-white/60">
            <img src="/products/pomegranate.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[8%] left-[30%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d fruit-shadow w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden opacity-35 fruit-3d-shine border border-white/50">
            <img src="/products/pear.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute top-[40%] right-[2%] animate-float3d-spin hidden xl:block">
          <div className="fruit-3d fruit-shadow w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden opacity-40 fruit-3d-shine border border-white/60">
            <img src="/products/banana.png" alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* Background logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src="/dbites-logo.png" alt="" className="w-[500px] md:w-[700px] h-auto object-contain opacity-[0.03] select-none" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative container mx-auto px-4 py-20 md:py-32 z-10">
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
