'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Award, Truck, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every fruit is naturally dehydrated without artificial preservatives, colors, or flavors. Pure fruit goodness in every bite.',
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200/60',
    fruit: '/products/3d-lime.png',
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'Our dehydration process preserves freshness naturally. Clean eating without harmful additives or hidden ingredients.',
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50',
    borderColor: 'border-orange-200/60',
    fruit: '/products/3d-mango.png',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest, freshest fruits make the cut. Hand-selected from trusted farms for exceptional quality and taste.',
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200/60',
    fruit: '/products/3d-passionfruit.png',
  },
  {
    icon: Truck,
    title: 'Mobile Fresh',
    description: 'As a mobile social hub, D-Bites brings premium snacks directly to you. Fresh, convenient, and always ready.',
    gradient: 'from-cyan-500 to-blue-500',
    bgGradient: 'from-cyan-50 to-blue-50',
    borderColor: 'border-cyan-200/60',
    fruit: '/products/3d-watermelon.png',
  },
]

export default function WhyDBites() {
  return (
    <section className="py-20 md:py-28 bg-tropical-warm relative overflow-hidden">
      {/* Prominent 3D floating fruits */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: '1200px' }}>
        <div className="absolute top-16 -right-10 animate-drift-medium">
          <div className="fruit-3d-prominent w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute bottom-16 -left-12 animate-drift-slow">
          <div className="fruit-3d-prominent w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden opacity-22 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </div>
        <div className="absolute top-1/3 left-[2%] animate-float3d-2 hidden lg:block">
          <div className="fruit-3d w-18 h-18 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/40">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-[4%] animate-float3d-3 hidden md:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-25 fruit-3d-shine border border-white/40">
            <img src="/products/3d-papaya.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-orange-500" />
            <span className="bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">Our Promise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-5">
            Why Choose <span className="gradient-text">D-Bites</span>?
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed text-lg">
            We deliver the finest dehydrated fruits with an unwavering focus on
            quality, freshness, and your well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className={`p-6 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border ${feature.borderColor} card-lift h-full relative overflow-hidden`}>
                {/* 3D fruit in corner of each card */}
                <div className="absolute -top-6 -right-6 animate-float3d-2 opacity-0 group-hover:opacity-35 transition-opacity duration-700" style={{ perspective: '400px' }}>
                  <div className="fruit-3d-prominent w-24 h-24 rounded-full overflow-hidden fruit-3d-shine">
                    <img src={feature.fruit} alt="" className="w-full h-full object-contain p-2" />
                  </div>
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
