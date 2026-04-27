'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface FloatingFruitsProps {
  variant?: 'full' | 'subtle' | 'hero' | 'section'
  className?: string
}

const fruitImages = [
  { src: '/products/3d-orange.png', size: 'w-24 h-24 md:w-36 md:h-36' },
  { src: '/products/3d-lemon.png', size: 'w-20 h-20 md:w-32 md:h-32' },
  { src: '/products/3d-lime.png', size: 'w-16 h-16 md:w-28 md:h-28' },
  { src: '/products/3d-mango.png', size: 'w-22 h-22 md:w-34 md:h-34' },
  { src: '/products/3d-pineapple.png', size: 'w-28 h-28 md:w-40 md:h-40' },
  { src: '/products/3d-papaya.png', size: 'w-18 h-18 md:w-30 md:h-30' },
  { src: '/products/3d-watermelon.png', size: 'w-20 h-20 md:w-28 md:h-28' },
  { src: '/products/3d-passionfruit.png', size: 'w-14 h-14 md:w-22 md:h-22' },
]

export default function FloatingFruits({ variant = 'full', className = '' }: FloatingFruitsProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 30])

  if (variant === 'hero') {
    return (
      <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ perspective: '1500px' }}>
        {/* Far layer - large, semi-transparent, slow */}
        <motion.div style={{ y: y2 }} className="absolute -top-16 -left-12 animate-drift-slow">
          <div className="fruit-3d-prominent w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden opacity-40 fruit-3d-shine">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-4" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute -bottom-12 -right-12 animate-drift-medium">
          <div className="fruit-3d-prominent w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden opacity-35 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-4" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute top-[15%] right-[3%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d-prominent w-36 h-36 rounded-full overflow-hidden opacity-35 fruit-3d-shine">
            <img src="/products/3d-papaya.png" alt="" className="w-full h-full object-contain p-3" />
          </div>
        </motion.div>

        {/* Mid layer - medium, more visible */}
        <motion.div style={{ y: y1 }} className="absolute top-[8%] left-[6%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden opacity-55 fruit-3d-shine border-2 border-white/40">
            <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[5%] right-[15%] animate-float3d-3 hidden md:block">
          <div className="fruit-3d fruit-shadow w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden opacity-50 fruit-3d-shine border-2 border-white/50">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[18%] left-[4%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d fruit-shadow w-22 h-22 md:w-32 md:h-32 rounded-full overflow-hidden opacity-45 fruit-3d-shine border-2 border-white/40">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </motion.div>

        {/* Near layer - small, vivid, fast */}
        <motion.div style={{ y: y3 }} className="absolute top-[20%] left-[32%] animate-splash-bounce hidden lg:block">
          <div className="fruit-3d fruit-shadow w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden opacity-60 fruit-3d-shine border border-white/60">
            <img src="/products/3d-watermelon.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute bottom-[22%] right-[6%] animate-float3d-1">
          <div className="fruit-3d fruit-shadow w-18 h-18 md:w-26 md:h-26 rounded-full overflow-hidden opacity-55 fruit-3d-shine border border-white/50">
            <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y2 }} className="absolute top-[55%] left-[1%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d fruit-shadow w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden opacity-50 fruit-3d-shine border border-white/40">
            <img src="/products/3d-papaya.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y1 }} className="absolute bottom-[8%] left-[28%] animate-drift-slow hidden md:block">
          <div className="fruit-3d fruit-shadow w-12 h-12 md:w-18 md:h-18 rounded-full overflow-hidden opacity-45 fruit-3d-shine border border-white/40">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute top-[42%] right-[1%] animate-float3d-spin hidden xl:block">
          <div className="fruit-3d fruit-shadow w-16 h-16 md:w-22 md:h-22 rounded-full overflow-hidden opacity-50 fruit-3d-shine border border-white/50">
            <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </motion.div>
      </div>
    )
  }

  if (variant === 'section') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ perspective: '1200px' }}>
        <div className="absolute -top-6 -left-8 animate-drift-slow">
          <div className="fruit-3d-prominent w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute -bottom-6 -right-8 animate-drift-medium">
          <div className="fruit-3d-prominent w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden opacity-25 fruit-3d-shine">
            <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-2" />
          </div>
        </div>
        <div className="absolute top-1/2 right-[3%] animate-float3d-3 hidden lg:block">
          <div className="fruit-3d w-18 h-18 rounded-full overflow-hidden opacity-30 fruit-3d-shine border border-white/50">
            <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[4%] animate-float3d-2 hidden md:block">
          <div className="fruit-3d w-14 h-14 rounded-full overflow-hidden opacity-25 fruit-3d-shine border border-white/40">
            <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-1" />
          </div>
        </div>
      </div>
    )
  }

  // 'full' variant - for global background
  return (
    <div ref={ref} className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`} style={{ perspective: '2000px' }}>
      {/* Scattered 3D fruits across the entire page - very subtle */}
      <div className="absolute top-[5%] left-[8%] animate-drift-slow">
        <div className="fruit-3d w-32 h-32 rounded-full overflow-hidden opacity-10 fruit-3d-shine">
          <img src="/products/3d-pineapple.png" alt="" className="w-full h-full object-contain p-3" />
        </div>
      </div>
      <div className="absolute top-[25%] right-[5%] animate-drift-medium">
        <div className="fruit-3d w-28 h-28 rounded-full overflow-hidden opacity-8 fruit-3d-shine">
          <img src="/products/3d-orange.png" alt="" className="w-full h-full object-contain p-3" />
        </div>
      </div>
      <div className="absolute top-[50%] left-[3%] animate-float3d-2">
        <div className="fruit-3d w-24 h-24 rounded-full overflow-hidden opacity-8 fruit-3d-shine">
          <img src="/products/3d-mango.png" alt="" className="w-full h-full object-contain p-2" />
        </div>
      </div>
      <div className="absolute top-[75%] right-[8%] animate-float3d-3">
        <div className="fruit-3d w-20 h-20 rounded-full overflow-hidden opacity-8 fruit-3d-shine">
          <img src="/products/3d-lemon.png" alt="" className="w-full h-full object-contain p-2" />
        </div>
      </div>
      <div className="absolute top-[40%] right-[15%] animate-drift-slow">
        <div className="fruit-3d w-16 h-16 rounded-full overflow-hidden opacity-6 fruit-3d-shine">
          <img src="/products/3d-lime.png" alt="" className="w-full h-full object-contain p-1" />
        </div>
      </div>
      <div className="absolute top-[60%] left-[12%] animate-float3d-1">
        <div className="fruit-3d w-18 h-18 rounded-full overflow-hidden opacity-6 fruit-3d-shine">
          <img src="/products/3d-passionfruit.png" alt="" className="w-full h-full object-contain p-1" />
        </div>
      </div>
    </div>
  )
}
