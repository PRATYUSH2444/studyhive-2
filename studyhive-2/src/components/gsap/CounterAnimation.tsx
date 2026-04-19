import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CounterAnimationProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function CounterAnimation({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState('0')

  useGSAP(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      onUpdate() {
        const v = decimals > 0 
          ? obj.val.toFixed(decimals)
          : Math.round(obj.val).toLocaleString('en-IN')
        setDisplayValue(String(v))
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once: true,
      },
    })
  }, { scope: ref })

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
