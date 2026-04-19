import type { ReactNode } from 'react';
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  className?: string
  stagger?: boolean
  distance?: number
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  distance = 60,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const dirMap = {
      up:    { y: distance, x: 0, scale: 1, opacity: 0 },
      down:  { y: -distance, x: 0, scale: 1, opacity: 0 },
      left:  { x: distance, y: 0, scale: 1, opacity: 0 },
      right: { x: -distance, y: 0, scale: 1, opacity: 0 },
      scale: { scale: 0.85, y: 0, x: 0, opacity: 0 },
      fade:  { opacity: 0, y: 0, x: 0, scale: 1 },
    }

    gsap.from(ref.current, {
      ...dirMap[direction],
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
