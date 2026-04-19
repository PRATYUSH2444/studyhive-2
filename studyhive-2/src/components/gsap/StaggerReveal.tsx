import type { ReactNode } from 'react';
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  itemSelector: string
  stagger?: number
  direction?: 'up' | 'left' | 'scale'
  delay?: number
}

export default function StaggerReveal({
  children,
  className = '',
  itemSelector,
  stagger = 0.12,
  direction = 'up',
  delay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const items = ref.current?.querySelectorAll(itemSelector)
    if (!items?.length) return

    const from = {
      up:    { opacity: 0, y: 60, rotateY: -5 },
      left:  { opacity: 0, x: -40 },
      scale: { opacity: 0, scale: 0.85, y: 20 },
    }[direction]

    gsap.from(items, {
      ...from,
      stagger,
      duration: 0.75,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
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
