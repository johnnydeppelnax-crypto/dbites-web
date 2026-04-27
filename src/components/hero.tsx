'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown, Sun } from 'lucide-react'
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
    <section ref={ref} className="relative overflow-hidden min-h-[100vh] flex items-center">
      {/* Vibrant tropical gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-cyan-50/50 to-purple-50/60" />
      
      {/* Animated tropical color blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 animate-liquid-wave" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/30 to-teal-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-liquid-wave" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-200/20 to-pink-100/15 rounded-full blur-3xl" />

      {/* ===== PROMINENT 3D FLOATING FRUITS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1500px' }}>
        
        {/* Far layer - large, dramatic, slow */}
        <motion.div style={{ y: y2 }} className="absolute -top-16 -left-16 animate-drift-slow">
          <div className="fruit-3d-prominent w-52 h-52 md:w-80 md:h-80 rounded-full overflow-hidden opacity-40 fruit-3d-shine">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-6" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute -bottom-16 -right-16 animate-drift-medium">
          <div className="fruit-3d-prominent w-56 h-56 md:w-96 md:h-96 rounded-full overflow-hidden opacity-35 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-6" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute top-[12%] right-[2%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d-prominent w-40 h-40 rounded-full overflow-hidden opacity-38 fruit-3d-shine">
            <img src="/products/3d-papaya.png" alt="" className="w-full h-full object-contain p-4" />
          </div>
        </motion.div>

        {/* Mid layer - prominent, vivid */}
        <motion.div style={{ y: y1 }} className="absolute top-[6%] left-[5%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden opacity-60 fruit-3d-shine border-3 border-white/50 shadow-2xl">
            <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[3%] right-[12%] animate-float3d-3 hidden md:block">
          <div className="fruit-3d fruit-shadow w-28 h-28 md:w-42 md:h-42 rounded-full overflow-hidden opacity-55 fruit-3d-shine border-3 border-white/50 shadow-2xl">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[15%] left-[3%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d fruit-shadow w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden opacity-50 fruit-3d-shine border-2 border-white/50 shadow-xl">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </motion.div>

        {/* Near layer - small, vivid, dramatic */}
        <motion.div style={{ y: y3 }} className="absolute top-[18%] left-[30%] animate-splash-bounce hidden lg:block">
          <div className="fruit-3d fruit-shadow w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden opacity-65 fruit-3d-shine border-2 border-white/60 shadow-xl">
            <img src="/products/3d-watermelon.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute bottom-[20%] right-[5%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-20 h-20 md:w-30 md:h-30 rounded-full overflow-hidden opacity-60 fruit-3d-shine border-2 border-white/50 shadow-xl">
            <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[52%] left-[0%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d fruit-shadow w-16 h-16 md:w-22 md:h-22 rounded-full overflow-hidden opacity-55 fruit-3d-shine border border-white/50">
            <img src="/products/3d-papaya.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[6%] left-[25%] animate-drift-slow hidden md:block">
          <div className="fruit-3d fruit-shadow w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden opacity-50 fruit-3d-shine border border-white/40">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute top-[38%] right-[0%] animate-float3d-spin hidden xl:block">
          <div className="fruit-3d fruit-shadow w-18 h-18 md:w-24 md:h-24 rounded-full overflow-hidden opacity-55 fruit-3d-shine border border-white/50">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative container mx-auto px-4 py-24 md:py-36 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-cyan-100 border border-orange-200/50 rounded-full px-5 py-2 text-sm font-semibold mb-8">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">Summer Vibes Are Here</span>
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]"
          >
            <span className="text-foreground">Taste The</span>
            <br />
            <span className="gradient-text">Tropical</span>
            <br />
            <span className="text-foreground">Sunshine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/70 mb-12 max-w-xl leading-relaxed font-medium"
          >
            D-Bites brings you premium dehydrated fruits bursting with tropical
            flavor. From our mobile lounge to your hands — every bite is a
            vacation for your taste buds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-base px-10 py-7 btn-tropical text-white shadow-xl hover:shadow-2xl shadow-orange-500/25 transition-all duration-300 rounded-2xl font-bold tracking-wide"
            >
              Summer Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-base px-8 py-7 border-2 border-cyan-300/50 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-2xl font-semibold bg-white/60 backdrop-blur-sm"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-10 mt-16 pt-8 border-t border-orange-200/40"
          >
            {[
              { value: '12+', label: 'Tropical Flavors', gradient: 'from-orange-500 to-amber-500' },
              { value: '100%', label: 'All Natural', gradient: 'from-cyan-500 to-teal-500' },
              { value: '5K+', label: 'Happy Customers', gradient: 'from-purple-500 to-pink-500' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/50 mt-1 font-medium">{stat.label}</div>
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
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-6 w-6 text-orange-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
