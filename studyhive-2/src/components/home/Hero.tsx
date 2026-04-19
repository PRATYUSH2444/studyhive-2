import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowRight, Play, Star, ChevronDown } from 'lucide-react'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  return (
    <section className="hero-section relative min-h-screen bg-hive-dark overflow-hidden flex flex-col">
      <div className="hero-canvas absolute inset-0 z-0" />
      <div className="absolute inset-0 z-1 opacity-20 bg-[url('/noise.svg')] bg-repeat" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-hive-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-hive-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 py-24">
        <div data-gsap="hero-badge" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hive-blue/30 bg-hive-blue/10 text-hive-blue text-sm font-medium mb-8 hover:bg-hive-blue/20 transition-colors cursor-default">
          <span className="w-2 h-2 rounded-full bg-hive-green animate-pulse-glow" />
          47,293 students studying right now
          <span className="text-hive-muted">•</span>
          <span className="text-hive-muted text-xs">Live</span>
        </div>

        <h1 ref={headlineRef} data-gsap="hero-headline" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white max-w-5xl leading-[1.05] tracking-tight mb-6">
          Study like you're<br />
          <span className="text-gradient-hive">already winning</span>
        </h1>

        <p data-gsap="hero-sub" className="text-lg sm:text-xl text-hive-muted max-w-2xl leading-relaxed mb-10">
          ARIA builds your personal AI brain. Predicts where you'll fail before you fail. Then makes sure you don't.
          <span className="text-white font-medium"> JEE. NEET. UPSC. CAT.</span>
          <br />One platform. Every exam.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button data-gsap="hero-cta-primary" size="lg" className="bg-hive-blue hover:bg-hive-blue/90 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-hive-blue hover:shadow-hive-blue hover:-translate-y-0.5 transition-all duration-200">
            Start for free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button data-gsap="hero-cta-secondary" variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 font-semibold px-8 py-4 text-lg rounded-xl hover:-translate-y-0.5 transition-all duration-200">
            <Play className="mr-2 w-5 h-5" />
            Watch ARIA work
          </Button>
        </div>

        <div data-gsap="hero-social-proof" className="flex flex-wrap items-center justify-center gap-6 text-sm text-hive-muted">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <Avatar key={i} className="w-7 h-7 border-2 border-hive-dark">
                  <AvatarFallback className="bg-hive-blue/20 text-xs text-hive-blue">
                    {String.fromCharCode(64 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>8,900+ exams cracked</span>
          </div>
          <div className="w-px h-4 bg-hive-border" />
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-hive-gold fill-hive-gold" />
            <span>4.9/5 from 12,000+ students</span>
          </div>
          <div className="w-px h-4 bg-hive-border" />
          <span>Free forever for core features</span>
        </div>
      </div>

      <div data-gsap="hero-scroll-indicator" className="relative z-10 flex flex-col items-center pb-8 text-hive-muted text-xs gap-2">
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-float" />
      </div>
    </section>
  )
}
