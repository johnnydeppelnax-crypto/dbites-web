'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Award, Truck } from 'lucide-react'
import TiltCard from './tilt-card'

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every fruit is naturally dehydrated without any artificial preservatives, colors, or flavors. Pure fruit goodness in every single bite you take.',
    gradient: 'from-emerald-400 to-green-500',
    bgGlow: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    emoji: '🌿',
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'We believe in clean eating. Our dehydration process preserves freshness naturally, so you never have to worry about harmful additives in your food.',
    gradient: 'from-amber-400 to-orange-500',
    bgGlow: 'bg-amber-50',
    iconColor: 'text-amber-600',
    emoji: '🛡️',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest, freshest fruits make the cut. We source from trusted farms and hand-select each batch for exceptional quality and unforgettable taste.',
    gradient: 'from-orange-400 to-red-500',
    bgGlow: 'bg-orange-50',
    iconColor: 'text-orange-600',
    emoji: '🏆',
  },
  {
    icon: Truck,
    title: 'Mobile Fresh',
    description: 'As a mobile social hub, D-Bites brings premium snacks directly to you. Fresh, convenient, and always ready to elevate your everyday experience.',
    gradient: 'from-violet-400 to-purple-500',
    bgGlow: 'bg-violet-50',
    iconColor: 'text-violet-600',
    emoji: '🚚',
  },
]

export default function WhyDBites() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-background relative overflow-hidden">
      {/* 3D background shapes */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
            Why Choose <span className="gradient-text">D-Bites</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We are committed to delivering the finest dehydrated fruits with an
            unwavering focus on quality, freshness, and your well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              style={{ perspective: '1000px' }}
            >
              <TiltCard maxTilt={10} scale={1.02} className="h-full">
                <div className="group text-center p-8 rounded-3xl bg-card border border-border/50 shadow-3d shadow-3d-hover transition-all duration-500 h-full relative overflow-hidden">
                  {/* Hover gradient overlay with 3D depth */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                  
                  {/* 3D floating emoji in background */}
                  <div className="absolute -top-4 -right-4 text-6xl opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 select-none">
                    {feature.emoji}
                  </div>

                  <div className={`w-16 h-16 rounded-2xl ${feature.bgGlow} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                    <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
