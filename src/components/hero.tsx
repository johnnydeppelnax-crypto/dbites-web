'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

export default function Hero() {
  const { setCurrentView } = useStore()

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />

      {/* Floating fruit decorations */}
      <div className="absolute top-[15%] left-[5%] text-7xl animate-float opacity-60 select-none">🥭</div>
      <div className="absolute top-[25%] right-[8%] text-6xl animate-float-reverse opacity-50 select-none">🍍</div>
      <div className="absolute bottom-[20%] left-[12%] text-5xl animate-float-slow opacity-40 select-none">🫐</div>
      <div className="absolute bottom-[30%] right-[15%] text-6xl animate-float opacity-45 select-none" style={{ animationDelay: '2s' }}>🍎</div>
      <div className="absolute top-[60%] left-[70%] text-5xl animate-float-reverse opacity-35 select-none" style={{ animationDelay: '1s' }}>🍊</div>
      <div className="absolute top-[10%] left-[45%] text-4xl animate-float opacity-30 select-none" style={{ animationDelay: '3s' }}>🥝</div>
      <div className="absolute bottom-[15%] left-[40%] text-4xl animate-float-slow opacity-30 select-none" style={{ animationDelay: '0.5s' }}>🥥</div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm font-medium mb-8 text-amber-200">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Premium Dehydrated Fruits
              <Sparkles className="h-4 w-4 text-amber-300" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Nature&apos;s Best,{' '}
            <span className="relative">
              <span className="gradient-text">Perfectly</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full origin-left"
              />
            </span>
            <br />
            Preserved
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-amber-100/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            D-Bites is a mobile social hub designed to elevate the street-side
            dining experience. We bring the sophistication of a high-end lounge
            to premium dehydrated fruits and gourmet snacks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-base px-10 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-base px-10 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
          >
            {[
              { value: '12+', label: 'Products' },
              { value: '100%', label: 'Natural' },
              { value: '5K+', label: 'Happy Customers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-amber-300">{stat.value}</div>
                <div className="text-sm text-amber-200/60 mt-1">{stat.label}</div>
              </div>
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
      </div>
    </section>
  )
}
