import type { ReactNode } from 'react';
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

interface TextSplitProps {
  children: string
  className?: string
  delay?: number
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
}

export default function TextSplit({
  children,
  className = '',
  delay = 0,
  type = 'chars',
  stagger = 0.018,
}: TextSplitProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const split = new SplitText(ref.current, { 
      type,
      linesClass: 'overflow-hidden',
    })
    
    const targets = type === 'chars' ? split.chars 
      : type === 'words' ? split.words 
      : split.lines

    gsap.from(targets, {
      opacity: 0,
      y: 80,
      rotateX: -90,
      stagger,
      duration: 0.75,
      delay,
      ease: 'back.out(1.7)',
      transformOrigin: '0% 50% -50px',
    })

    return () => split.revert()
  }, { scope: ref })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
