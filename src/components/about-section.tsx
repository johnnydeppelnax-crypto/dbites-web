'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Globe, Sparkles, Target } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function AboutSection() {
  const { setCurrentView } = useStore()

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Main image area */}
              <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200 rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/15" />
                <div className="text-[100px] drop-shadow-lg">🥭</div>
              </div>

              {/* Floating fruits */}
              <div className="absolute top-4 right-4 text-5xl animate-float">🍎</div>
              <div className="absolute bottom-8 left-4 text-4xl animate-float-reverse">🫐</div>
              <div className="absolute top-1/2 -right-4 text-4xl animate-float-slow">🍍</div>

              {/* Stats card overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl">
                    🍈
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">5K+</p>
                    <p className="text-xs text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </motion.div>

              {/* Second overlay card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
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
                { icon: Heart, label: 'Made with Love', color: 'text-rose-500 bg-rose-50' },
                { icon: Users, label: 'Community First', color: 'text-amber-600 bg-amber-50' },
                { icon: Globe, label: 'Sustainable', color: 'text-emerald-500 bg-emerald-50' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-3`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentView('shop')}
              className="px-8 py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
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
