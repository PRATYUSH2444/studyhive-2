import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLocation } from 'react-router-dom'

export default function usePageTransition() {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 16, scale: 0.99 },
      { 
        opacity: 1, y: 0, scale: 1,
        duration: 0.45, 
        ease: 'power3.out',
        clearProps: 'all',
      }
    )
  }, [location.pathname])

  return containerRef
}
