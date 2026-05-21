'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown, Sun } from 'lucide-react'

export default function Hero() {
  const { setCurrentView } = useStore()

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center">
      {/* Vibrant tropical gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-cyan-50/50 to-purple-50/60" />

      {/* Animated tropical color blobs — lightweight CSS only */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-orange-200/40 to-amber-100/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 animate-morph-soft" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-cyan-200/30 to-teal-100/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-morph-soft" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-purple-200/20 to-pink-100/15 rounded-full blur-3xl" />

      {/* ===== LIGHTWEIGHT FLOATING FRUITS (emoji-based, no image downloads) ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Far layer — large, subtle, slow */}
        <div className="absolute -top-10 -left-10 md:-top-16 md:-left-16 animate-float-gentle-1">
          <span className="text-6xl md:text-9xl opacity-25 select-none block" role="img" aria-label="pineapple">🍍</span>
        </div>
        <div className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 animate-float-gentle-2">
          <span className="text-7xl md:text-[10rem] opacity-20 select-none block" role="img" aria-label="orange">🍊</span>
        </div>
        <div className="absolute top-[12%] right-[2%] animate-float-gentle-3 hidden lg:block">
          <span className="text-5xl md:text-7xl opacity-25 select-none block" role="img" aria-label="papaya">🫛</span>
        </div>

        {/* Mid layer — prominent, vivid */}
        <div className="absolute top-[6%] left-[5%] animate-float-gentle-1">
          <span className="text-4xl md:text-7xl opacity-40 select-none block" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute top-[3%] right-[12%] animate-float-gentle-2 hidden md:block">
          <span className="text-3xl md:text-5xl opacity-35 select-none block" role="img" aria-label="lemon">🍋</span>
        </div>
        <div className="absolute bottom-[15%] left-[3%] animate-float-gentle-3 hidden md:block">
          <span className="text-3xl md:text-5xl opacity-30 select-none block" role="img" aria-label="lime">🍈</span>
        </div>

        {/* Near layer — small, vivid */}
        <div className="absolute top-[18%] left-[30%] animate-float-gentle-1 hidden lg:block">
          <span className="text-2xl md:text-3xl opacity-45 select-none block" role="img" aria-label="watermelon">🍉</span>
        </div>
        <div className="absolute bottom-[20%] right-[5%] animate-float-gentle-2 hidden sm:block">
          <span className="text-xl md:text-4xl opacity-40 select-none block" role="img" aria-label="passionfruit">🫐</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-36 z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-100 to-cyan-100 border border-orange-200/50 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
              <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">Summer Vibes Are Here</span>
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-500" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.05]"
          >
            <span className="text-foreground">Taste The</span>
            <br />
            <span className="gradient-text">Tropical</span>
            <br />
            <span className="text-foreground">Sunshine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 sm:mb-12 max-w-xl leading-relaxed font-medium"
          >
            D-Bites brings you premium dehydrated fruits bursting with tropical
            flavor. From our mobile lounge to your hands — every bite is a
            vacation for your taste buds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              onClick={() => setCurrentView('shop')}
              className="text-sm sm:text-base px-8 sm:px-10 py-5 sm:py-7 btn-tropical text-white shadow-xl hover:shadow-2xl shadow-orange-500/25 transition-all duration-300 rounded-2xl font-bold tracking-wide"
            >
              Summer Deals
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('about')}
              className="text-sm sm:text-base px-8 sm:px-8 py-5 sm:py-7 border-2 border-cyan-300/50 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-2xl font-semibold bg-white/60 backdrop-blur-sm"
            >
              Our Story
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-6 sm:gap-10 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-orange-200/40"
          >
            {[
              { value: '32+', label: 'Tropical Flavors', gradient: 'from-orange-500 to-amber-500' },
              { value: '100%', label: 'All Natural', gradient: 'from-cyan-500 to-teal-500' },
              { value: '5K+', label: 'Happy Customers', gradient: 'from-purple-500 to-pink-500' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-foreground/50 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
