'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'
import TiltCard from './tilt-card'

export default function AboutSection() {
  const { setCurrentView } = useStore()

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* 3D background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: '1200px' }}
            className="relative"
          >
            <div className="relative">
              {/* Main 3D card */}
              <TiltCard maxTilt={8} scale={1.01} glare={true}>
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200 rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-3d">
                  {/* 3D depth layers */}
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/25 shadow-inner" />
                  <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/20 shadow-inner" />
                  <div className="absolute top-1/3 left-0 w-20 h-20 rounded-full bg-white/10" />
                  
                  <div className="text-[100px] drop-shadow-2xl animate-rotate3d">🥭</div>
                </div>
              </TiltCard>

              {/* 3D floating fruits with depth */}
              <motion.div
                animate={{ y: [-8, 8, -8], rotateY: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 text-5xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                🍎
              </motion.div>
              <motion.div
                animate={{ y: [6, -10, 6], rotateX: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-0 text-4xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                🫐
              </motion.div>
              <motion.div
                animate={{ y: [-5, 10, -5], rotateZ: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-4 text-4xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                🍍
              </motion.div>

              {/* 3D stat cards with depth */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-3d border border-border/50 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-500/30">
                    🍈
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">5K+</p>
                    <p className="text-xs text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-3d border border-border/50 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">100%</p>
                    <p className="text-xs text-muted-foreground">All Natural</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
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
                { icon: Heart, label: 'Made with Love', color: 'text-rose-500 bg-rose-50 shadow-md shadow-rose-500/10' },
                { icon: Users, label: 'Community First', color: 'text-amber-600 bg-amber-50 shadow-md shadow-amber-500/10' },
                { icon: Globe, label: 'Sustainable', color: 'text-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-3 transition-transform duration-300`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentView('shop')}
              className="px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 rounded-xl"
            >
              Explore Our Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
