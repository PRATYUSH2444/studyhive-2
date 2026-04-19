import type { ReactNode } from 'react';
import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ 
  children, 
  strength = 0.3, 
  className = '',
  onClick
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const boundingRef = useRef<DOMRect | null>(null)

  const onMouseEnter = useCallback(() => {
    boundingRef.current = ref.current?.getBoundingClientRect() || null
    gsap.to(ref.current, { 
      scale: 1.05, 
      duration: 0.3, 
      ease: 'power2.out' 
    })
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!boundingRef.current || !ref.current) return
    const { left, top, width, height } = boundingRef.current
    const deltaX = (e.clientX - left - width / 2) * strength
    const deltaY = (e.clientY - top - height / 2) * strength
    gsap.to(ref.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [strength])

  const onMouseLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    })
    boundingRef.current = null
  }, [])

  return (
    <div
      ref={ref}
      className={`magnetic inline-block cursor-pointer ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
