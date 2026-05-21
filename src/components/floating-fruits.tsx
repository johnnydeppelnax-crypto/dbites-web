'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useEffect } from 'react'

interface FloatingFruitsProps {
  variant?: 'full' | 'subtle' | 'hero' | 'section'
  className?: string
}

// Lightweight emoji-based fruit data — no image downloads needed
const fruitEmojis = [
  { emoji: '🍊', label: 'orange' },
  { emoji: '🍋', label: 'lemon' },
  { emoji: '🍈', label: 'lime' },
  { emoji: '🥭', label: 'mango' },
  { emoji: '🍍', label: 'pineapple' },
  { emoji: '🫛', label: 'papaya' },
  { emoji: '🍉', label: 'watermelon' },
  { emoji: '🫐', label: 'passionfruit' },
]

// Lazy-loaded inner component — only renders after initial page load
function FloatingFruitsInner({ variant = 'full', className = '' }: FloatingFruitsProps) {
  const [visible, setVisible] = useState(false)

  // Defer rendering to after the page is interactive
  useEffect(() => {
    if (typeof window === 'undefined') return

    const idleCallback = window.requestIdleCallback
      ? window.requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 200)

    const handle = idleCallback(() => setVisible(true))
    return () => {
      if (typeof window.cancelIdleCallback !== 'undefined') {
        window.cancelIdleCallback(handle as number)
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>)
      }
    }
  }, [])

  if (!visible) return null

  if (variant === 'hero') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Far layer — large, semi-transparent, slow */}
        <div className="absolute -top-12 -left-8 animate-float-gentle-1">
          <span className="text-6xl md:text-8xl opacity-30 select-none block" role="img" aria-label="pineapple">🍍</span>
        </div>
        <div className="absolute -bottom-10 -right-8 animate-float-gentle-2">
          <span className="text-7xl md:text-9xl opacity-25 select-none block" role="img" aria-label="orange">🍊</span>
        </div>
        <div className="absolute top-[15%] right-[3%] animate-float-gentle-3 hidden lg:block">
          <span className="text-5xl md:text-7xl opacity-30 select-none block" role="img" aria-label="papaya">🫛</span>
        </div>

        {/* Mid layer — medium, more visible */}
        <div className="absolute top-[8%] left-[6%] animate-float-gentle-1">
          <span className="text-4xl md:text-6xl opacity-40 select-none block" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute top-[5%] right-[15%] animate-float-gentle-2 hidden md:block">
          <span className="text-3xl md:text-5xl opacity-35 select-none block" role="img" aria-label="lemon">🍋</span>
        </div>
        <div className="absolute bottom-[18%] left-[4%] animate-float-gentle-3 hidden md:block">
          <span className="text-3xl md:text-4xl opacity-30 select-none block" role="img" aria-label="lime">🍈</span>
        </div>

        {/* Near layer — small, vivid */}
        <div className="absolute top-[20%] left-[32%] animate-float-gentle-1 hidden lg:block">
          <span className="text-2xl md:text-3xl opacity-45 select-none block" role="img" aria-label="watermelon">🍉</span>
        </div>
        <div className="absolute bottom-[22%] right-[6%] animate-float-gentle-2">
          <span className="text-xl md:text-3xl opacity-40 select-none block" role="img" aria-label="passionfruit">🫐</span>
        </div>
      </div>
    )
  }

  if (variant === 'section') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        <div className="absolute -top-4 -left-6 animate-float-gentle-1">
          <span className="text-4xl md:text-6xl opacity-20 select-none block" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute -bottom-4 -right-6 animate-float-gentle-2">
          <span className="text-3xl md:text-5xl opacity-20 select-none block" role="img" aria-label="orange">🍊</span>
        </div>
        <div className="absolute top-1/2 right-[3%] animate-float-gentle-3 hidden lg:block">
          <span className="text-2xl opacity-20 select-none block" role="img" aria-label="lime">🍈</span>
        </div>
      </div>
    )
  }

  // 'full' variant — global fixed background, very subtle
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <div className="absolute top-[5%] left-[8%] animate-float-gentle-1">
        <span className="text-4xl md:text-5xl opacity-[0.07] select-none block" role="img" aria-label="pineapple">🍍</span>
      </div>
      <div className="absolute top-[25%] right-[5%] animate-float-gentle-2">
        <span className="text-3xl md:text-4xl opacity-[0.06] select-none block" role="img" aria-label="orange">🍊</span>
      </div>
      <div className="absolute top-[50%] left-[3%] animate-float-gentle-3">
        <span className="text-3xl opacity-[0.06] select-none block" role="img" aria-label="mango">🥭</span>
      </div>
      <div className="absolute top-[75%] right-[8%] animate-float-gentle-1">
        <span className="text-2xl opacity-[0.06] select-none block" role="img" aria-label="lemon">🍋</span>
      </div>
      <div className="absolute top-[40%] right-[15%] animate-float-gentle-2">
        <span className="text-xl opacity-[0.05] select-none block" role="img" aria-label="lime">🍈</span>
      </div>
      <div className="absolute top-[60%] left-[12%] animate-float-gentle-3">
        <span className="text-xl opacity-[0.05] select-none block" role="img" aria-label="passionfruit">🫐</span>
      </div>
    </div>
  )
}

// Dynamically import with SSR disabled to avoid blocking initial render
const FloatingFruits = dynamic(() => Promise.resolve(FloatingFruitsInner), {
  ssr: false,
})

export default FloatingFruits
