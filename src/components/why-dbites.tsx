'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Award, Truck } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Every fruit is naturally dehydrated without any artificial preservatives, colors, or flavors. Pure fruit goodness in every bite.',
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: Shield,
    title: 'No Preservatives',
    description: 'We believe in clean eating. Our dehydration process preserves freshness naturally, so you never have to worry about harmful additives.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest, freshest fruits make the cut. We source from trusted farms and hand-select each batch for exceptional quality and taste.',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    icon: Truck,
    title: 'Mobile Fresh',
    description: 'As a mobile social hub, D-Bites brings premium snacks directly to you. Fresh, convenient, and always ready to elevate your day.',
    color: 'bg-purple-100 text-purple-700',
  },
]

export default function WhyDBites() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/50 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">D-Bites</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are committed to delivering the finest dehydrated fruits with an
            unwavering focus on quality, freshness, and your well-being.
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
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
