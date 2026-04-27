'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Award, Truck } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every fruit is naturally dehydrated without artificial preservatives, colors, or flavors. Pure fruit goodness in every bite.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100',
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'Our dehydration process preserves freshness naturally. Clean eating without harmful additives or hidden ingredients.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest, freshest fruits make the cut. Hand-selected from trusted farms for exceptional quality and taste.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    icon: Truck,
    title: 'Mobile Fresh',
    description: 'As a mobile social hub, D-Bites brings premium snacks directly to you. Fresh, convenient, and always ready.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-100',
  },
]

export default function WhyDBites() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Subtle organic shape */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-50/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-50/40 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase mb-3 block">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Why Choose <span className="gradient-text">D-Bites</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We deliver the finest dehydrated fruits with an unwavering focus on
            quality, freshness, and your well-being.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group"
            >
              <div className={`p-6 rounded-2xl bg-white border ${feature.borderColor} card-lift h-full`}>
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
