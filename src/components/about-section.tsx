'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function AboutSection() {
  const { setCurrentView } = useStore()

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-tropical-cool relative overflow-hidden">
      {/* Prominent 3D floating fruits */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute top-16 right-[8%] animate-drift-medium hidden sm:block">
          <div className="fruit-3d-prominent w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/40">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute bottom-20 left-[6%] animate-drift-slow hidden sm:block">
          <div className="fruit-3d-prominent w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute top-1/2 -right-6 animate-float3d-spin hidden lg:block">
          <div className="fruit-3d w-20 h-20 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/40">
            <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[1%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-25 fruit-3d-shine border border-white/40">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Side - with 3D floating fruit accents */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main image with tropical frame */}
              <div className="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-2 sm:ring-4 ring-white/50">
                <img
                  src="/products/mango.png"
                  alt="D-Bites Premium Dehydrated Mango"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3D floating accent image - top right (hidden on small mobile) */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotateY: [0, 12, 0], rotateX: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 hidden sm:block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d-prominent fruit-shadow w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                  <img src="/products/3d-lemon.png" alt="Lemon" className="w-full h-full object-contain p-2" />
                </div>
              </motion.div>

              {/* 3D floating accent - bottom left (hidden on small mobile) */}
              <motion.div
                animate={{ y: [5, -10, 5], rotateY: [0, -10, 0], rotateX: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 hidden sm:block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d-prominent fruit-shadow w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white">
                  <img src="/products/3d-lime.png" alt="Lime" className="w-full h-full object-contain p-2" />
                </div>
              </motion.div>

              {/* 3D spinning fruit - top left */}
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-6 sm:-left-10 hidden lg:block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-80 border-2 border-white shadow-lg">
                  <img src="/products/3d-orange.png" alt="Orange" className="w-full h-full object-contain p-1" />
                </div>
              </motion.div>

              {/* Stats overlay - repositioned for mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-3 -left-2 sm:-bottom-8 sm:-left-8 bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-cyan-100/50 z-10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-md">
                    <Globe className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-3xl font-black bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">100%</p>
                    <p className="text-[10px] sm:text-xs text-foreground/50 font-semibold">All Natural</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Our Story</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-8 leading-tight">
              The <span className="gradient-text">D-Bites</span> Experience
            </h2>

            <p className="text-foreground/70 mb-4 sm:mb-5 leading-relaxed text-sm sm:text-lg font-medium">
              D-Bites was born from a simple yet powerful vision: to elevate the
              street-side dining experience with premium dehydrated fruits and gourmet
              snacks. We saw a gap in the market for sophisticated, on-the-go refreshments
              that didn&apos;t compromise on quality or taste.
            </p>

            <p className="text-foreground/60 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              As a mobile social hub, we bring the sophistication of a high-end lounge
              directly to the streets. Our unique fusion of premium snacks and a modern,
              upbeat atmosphere creates a dining experience unlike any other. Whether it is
              a quick refresh or a social gathering, D-Bites delivers &ldquo;the best
              taste&rdquo; through quality ingredients and an unwavering commitment to
              excellence.
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
              {[
                { icon: Heart, label: 'Made with Love', gradient: 'from-rose-500 to-pink-500', bg: 'from-rose-50 to-pink-50' },
                { icon: Users, label: 'Community First', gradient: 'from-orange-500 to-amber-500', bg: 'from-orange-50 to-amber-50' },
                { icon: Globe, label: 'Sustainable', gradient: 'from-emerald-500 to-teal-500', bg: 'from-emerald-50 to-teal-50' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center mb-2 sm:mb-3 shadow-sm`}>
                    <item.icon className={`h-5 w-5 sm:h-7 sm:w-7 bg-gradient-to-r ${item.gradient} bg-clip-text`} style={{ color: 'transparent', backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, WebkitBackgroundClip: 'text' }} />
                  </div>
                  <span className="text-[10px] sm:text-sm font-bold leading-tight">{item.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentView('shop')}
              className="px-6 sm:px-8 py-4 sm:py-6 btn-tropical text-white shadow-xl hover:shadow-2xl shadow-orange-500/20 transition-all duration-300 rounded-2xl font-bold text-sm sm:text-base border-0"
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
