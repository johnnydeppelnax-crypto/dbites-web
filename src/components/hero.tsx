'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const { setCurrentView } = useStore()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Deep 3D background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-orange-900 to-red-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      
      {/* 3D animated orbs with depth */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-20 left-[10%] w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse-glow"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-20 right-[10%] w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse-glow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl"
      />

      {/* 3D floating fruit decorations with parallax depth */}
      <motion.div style={{ y: y1, x: 0 }} className="absolute top-[15%] left-[5%] text-7xl animate-rotate3d opacity-60 select-none perspective-1000">
        <span className="glow-amber inline-block">🥭</span>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[25%] right-[8%] text-6xl animate-rotate3d opacity-50 select-none" >
        <span className="glow-orange inline-block" style={{ animationDelay: '2s' }}>🍍</span>
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute bottom-[20%] left-[12%] text-5xl animate-rotate3d opacity-40 select-none">
        <span className="inline-block" style={{ animationDelay: '4s' }}>🫐</span>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-[30%] right-[15%] text-6xl animate-rotate3d opacity-45 select-none">
        <span className="glow-amber inline-block" style={{ animationDelay: '1s' }}>🍎</span>
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute top-[60%] left-[70%] text-5xl animate-rotate3d opacity-35 select-none">
        <span className="inline-block" style={{ animationDelay: '3s' }}>🍊</span>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[10%] left-[45%] text-4xl animate-rotate3d opacity-30 select-none">
        <span className="inline-block" style={{ animationDelay: '5s' }}>🥝</span>
      </motion.div>
      <motion.div style={{ y: y1 }} className="absolute bottom-[15%] left-[40%] text-4xl animate-rotate3d opacity-30 select-none">
        <span className="glow-orange inline-block" style={{ animationDelay: '2.5s' }}>🥥</span>
      </motion.div>

      {/* 3D spinning ring in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04]">
        <div className="w-full h-full rounded-full border-[3px] border-white animate-spin3d" style={{ transformStyle: 'preserve-3d' }} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.03]">
        <div className="w-full h-full rounded-full border-[2px] border-white animate-spin3d" style={{ transformStyle: 'preserve-3d', animationDirection: 'reverse', animationDuration: '15s' }} />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <motion.div style={{ opacity, scale }} className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center" style={{ perspective: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-8 text-amber-200 shadow-lg shadow-amber-500/10">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Premium Dehydrated Fruits
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] text-3d"
          >
            Nature&apos;s Best,{' '}
            <span className="relative inline-block">
              <span className="gradient-text">Perfectly</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full origin-left shadow-lg shadow-amber-500/50"
              />
            </span>
            <br />
            Preserved
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-amber-100/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            D-Bites is a mobile social hub designed to elevate the street-side
            dining experience. We bring the sophistication of a high-end lounge
            to premium dehydrated fruits and gourmet snacks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-base px-10 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-base px-10 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 rounded-xl"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Stats with 3D depth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
          >
            {[
              { value: '12+', label: 'Products' },
              { value: '100%', label: 'Natural' },
              { value: '5K+', label: 'Happy Customers' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.1, rotateX: -5 }}
                className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-default"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-amber-300 drop-shadow-lg">{stat.value}</div>
                <div className="text-sm text-amber-200/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6 text-white/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
