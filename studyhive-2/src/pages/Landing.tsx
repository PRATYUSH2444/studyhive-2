import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import useBreakpoint from '@/hooks/useBreakpoint'
import {
  ArrowRight, Play, Star, ChevronDown,
  Brain, Zap, Users, BarChart2,
  Shield, Trophy, BookOpen, Target
} from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

export default function Landing() {
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()
  const { isAuthenticated } = useUserStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-hive-dark text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 
        border-b border-hive-border/50 bg-hive-dark/80 
        backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 
          flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-hive-blue/20 
              border border-hive-blue/40 flex items-center justify-center">
              <Brain className="w-5 h-5 text-hive-blue" />
            </div>
            <span className="font-bold text-lg">
              Study<span className="text-hive-blue">Hive</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm 
            text-hive-muted">
            <a href="#features" 
              className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#battle" 
              className="hover:text-white transition-colors">
              Battle
            </a>
            <a href="#pricing" 
              className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" 
              className="text-hive-muted hover:text-white"
              onClick={() => navigate('/login')}>
              Sign in
            </Button>
            <Button size="sm"
              className="bg-hive-blue hover:bg-hive-blue/90 text-white"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}>
              Get started
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center 
        justify-center text-center px-4 pt-16">

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 
          w-[600px] h-[600px] bg-hive-blue/5 rounded-full 
          blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 
          bg-hive-purple/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 
            rounded-full border border-hive-blue/30 bg-hive-blue/10 
            text-hive-blue text-sm font-medium mb-8 animate-fade-down">
            <span className="w-2 h-2 rounded-full bg-hive-green 
              animate-pulse" />
            47,293 students studying right now
          </div>

          {/* Headline */}
          <h1 className="font-bold text-white leading-[1.05] tracking-tight mb-6 animate-fade-up delay-200 opacity-0"
              style={{ fontSize: isMobile ? '36px' : isTablet ? '52px' : '72px' }}>
            Study like you're<br />
            <span className="bg-gradient-to-r from-hive-blue to-hive-purple 
              bg-clip-text text-transparent">
              already winning
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-hive-muted max-w-2xl 
            mx-auto leading-relaxed mb-10 animate-fade-up delay-400 opacity-0">
            ARIA builds your personal AI brain. Predicts where you'll fail 
            before you fail. JEE. NEET. UPSC. CAT. One platform.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 
            justify-center mb-16 animate-fade-up delay-500 opacity-0"
            style={{ flexDirection: isMobile ? 'column' : 'row' }}>
            <Button
              size="lg"
              className="bg-hive-blue hover:bg-hive-blue/90 text-white 
              font-semibold px-8 h-14 text-lg rounded-xl flex items-center justify-center transition-transform hover:-translate-y-1"
              style={{ width: isMobile ? '100%' : 'auto' }}
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}>
              Start for free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-hive-border text-white hover:bg-hive-surface 
              font-semibold px-8 h-14 text-lg rounded-xl flex items-center justify-center transition-transform hover:-translate-y-1"
              style={{ width: isMobile ? '100%' : 'auto' }}>
              <Play className="mr-2 w-5 h-5" />
              Watch ARIA work
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 text-sm text-hive-muted animate-fade-up delay-700 opacity-0"
               style={{ flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap' }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['AK','RJ','PS','SM'].map(init => (
                  <Avatar key={init} 
                    className="w-7 h-7 border-2 border-hive-dark">
                    <AvatarFallback 
                      className="bg-hive-blue/20 text-hive-blue 
                      text-xs">
                      {init[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span>8,900+ exams cracked</span>
            </div>
            {!isMobile && <div className="w-px h-4 bg-hive-border" />}
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-hive-gold fill-hive-gold" />
              <span>4.9/5 from 12,000+ students</span>
            </div>
            {!isMobile && <div className="w-px h-4 bg-hive-border" />}
            <span>Free forever for core features</span>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center 
          gap-2 text-hive-muted text-xs animate-fade-up delay-800 opacity-0">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" 
        className="py-24 px-4 max-w-7xl mx-auto">
        <div className="reveal text-center mb-16">
          <Badge className="bg-hive-purple/20 text-hive-purple 
            border-0 mb-4">
            Every feature has AI behind it
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Not a study app.<br />
            <span className="text-hive-blue">An AI war room.</span>
          </h2>
          <p className="text-hive-muted text-lg max-w-2xl mx-auto">
            ARIA watches how you study, predicts where you'll fail, 
            and fixes it before exam day.
          </p>
        </div>

        <div className="features-grid grid gap-6"
             style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              icon: Brain,
              color: 'text-hive-blue',
              bg: 'bg-hive-blue/10 border-hive-blue/20',
              title: 'ARIA Intelligence',
              desc: 'Your personal AI builds a live cognitive model — knowledge graph, error DNA, forgetting curves, peak performance window.',
            },
            {
              icon: Zap,
              color: 'text-hive-gold',
              bg: 'bg-hive-gold/10 border-hive-gold/20',
              title: 'Battle Arena',
              desc: '1v1 real-time battles, daily blitz, boss fights. Win ELO points. ARIA picks questions from your weak spots.',
            },
            {
              icon: BarChart2,
              color: 'text-hive-green',
              bg: 'bg-hive-green/10 border-hive-green/20',
              title: 'Cognitive Analytics',
              desc: 'Weekly cognitive reports. Score prediction with confidence intervals. Full autopsy after every mock test.',
            },
            {
              icon: Users,
              color: 'text-hive-purple',
              bg: 'bg-hive-purple/10 border-hive-purple/20',
              title: 'Hive Rooms',
              desc: 'Silent focus rooms, discussion hives, lecture rooms, accountability check-ins. Study together or compete.',
            },
            {
              icon: BookOpen,
              color: 'text-hive-blue',
              bg: 'bg-hive-blue/10 border-hive-blue/20',
              title: 'DeepStudy',
              desc: 'AI note-taking, PDF Annihilator, YouTube to notes, mind map generator, formula vault with spaced repetition.',
            },
            {
              icon: Target,
              color: 'text-hive-red',
              bg: 'bg-hive-red/10 border-hive-red/20',
              title: 'ExamForge',
              desc: 'AI generates unique papers every time. Predict this year\'s paper. PYQ intelligence. Adaptive full-length tests.',
            },
          ].map(({ icon: Icon, color, bg, title, desc }, index) => (
            <div key={title}
              className="reveal hive-card p-6 
              hover:border-hive-blue/40 hover:-translate-y-1 transition-all duration-300 
              cursor-default group relative"
              style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className={`w-12 h-12 rounded-xl border ${bg} 
                flex items-center justify-center mb-4 
                group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {title}
              </h3>
              <p className="text-hive-muted text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE STATS */}
      <section className="reveal py-16 border-y border-hive-border bg-hive-surface/30">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 
          md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl font-bold text-hive-blue block mb-1">47,293</span>
            <p className="text-hive-muted text-sm">Students online now</p>
          </div>
          <div>
            <span className="text-4xl font-bold text-hive-purple block mb-1">2.8M+</span>
            <p className="text-hive-muted text-sm">Questions generated</p>
          </div>
          <div>
            <span className="text-4xl font-bold text-hive-green block mb-1">8,900+</span>
            <p className="text-hive-muted text-sm">Exams cracked</p>
          </div>
          <div>
            <span className="text-4xl font-bold text-hive-gold block mb-1">1.2M+</span>
            <p className="text-hive-muted text-sm">Doubts resolved</p>
          </div>
        </div>
      </section>

      {/* BATTLE SECTION */}
      <section id="battle" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid gap-12 items-center"
             style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <div className="reveal">
            <Badge className="bg-hive-red/20 text-hive-red border-0 mb-4">
              Where dopamine lives
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Study is a sport.<br />
              <span className="text-hive-red">Compete like one.</span>
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: Zap, title: '1v1 Lightning Battles', 
                  desc: 'Real opponent, 10 questions, 90 seconds each. ELO rating updates live.' },
                { icon: Shield, title: 'Boss Battles', 
                  desc: 'Weekly ultra-hard concepts. First 100 solvers get Boss Slayer badge.' },
                { icon: Trophy, title: 'Hive Wars', 
                  desc: '5v5 team battles. Win together or lose together.' },
              ].map(({ icon: Icon, title, desc }, index) => (
                <div key={title} 
                  className="reveal flex gap-4 p-4 hive-card 
                  hover:border-hive-red/40 transition-colors"
                  style={{ transitionDelay: `${index * 0.1}s` }}>
                  <Icon className="w-5 h-5 text-hive-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">
                      {title}
                    </p>
                    <p className="text-hive-muted text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="mt-6 bg-hive-red hover:bg-hive-red/90 
              text-white font-semibold flex items-center transition-transform hover:-translate-y-1"
              onClick={() => navigate('/battle')}>
              Enter Battle Arena
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Battle preview card */}
          <div className="reveal hive-card p-6 relative overflow-hidden" style={{ transitionDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-gradient-to-br 
              from-hive-red/5 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border border-hive-red/50">
                  <AvatarFallback 
                    className="bg-hive-red/20 text-hive-red text-xs">
                    RK
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white font-medium">
                  Rahul K.
                </span>
              </div>
              <span className="text-2xl font-bold text-hive-blue">VS</span>
              <div className="flex items-center gap-2 flex-row-reverse">
                <Avatar className="w-8 h-8 border border-hive-blue/50">
                  <AvatarFallback 
                    className="bg-hive-blue/20 text-hive-blue text-xs">
                    AK
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white font-medium">You</span>
              </div>
            </div>
            <div className="hive-card p-4 mb-4">
              <p className="text-xs text-hive-muted mb-3">
                A convex lens of focal length 20cm...
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['30 cm','45 cm','60 cm','15 cm'].map((opt, i) => (
                  <div key={i}
                    className={`p-2 rounded-lg border text-xs text-center
                    font-medium transition-colors
                    ${i === 0 ? 
                      'border-hive-green bg-hive-green/10 text-hive-green' 
                      : 'border-hive-border text-hive-muted'}`}>
                    {String.fromCharCode(65+i)}. {opt}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <Badge className="bg-hive-green/20 text-hive-green border-0">
                You're winning +240 pts
              </Badge>
              <span className="text-hive-muted font-mono">00:23</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="reveal text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start free. Scale when you're ready.
          </h2>
          <p className="text-hive-muted">
            No credit card. No commitment. Cancel anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Free',
              price: '₹0',
              period: 'forever',
              color: 'border-hive-border',
              badge: null,
              features: [
                '20 AI questions/day',
                'Basic analytics',
                '2 Hive Rooms',
                'Community doubts',
                'Daily Blitz',
              ],
              cta: 'Get started free',
              ctaClass: 'border-hive-border text-white hover:bg-hive-surface',
              variant: 'outline' as const,
            },
            {
              name: 'Pro',
              price: '₹499',
              period: 'per month',
              color: 'border-hive-blue',
              badge: 'Most Popular',
              features: [
                'Unlimited AI questions',
                'Full ARIA Analytics',
                'Unlimited Hive Rooms',
                'AICoach full access',
                'Mock test series',
                'PDF Annihilator 50 pages',
              ],
              cta: 'Start Pro',
              ctaClass: 'bg-hive-blue hover:bg-hive-blue/90 text-white',
              variant: 'default' as const,
            },
            {
              name: 'Elite',
              price: '₹999',
              period: 'per month',
              color: 'border-hive-purple',
              badge: 'Best Results',
              features: [
                'Everything in Pro',
                '4 mentor sessions/month',
                'Exam Fingerprint papers',
                '3D Knowledge Graph',
                'Unlimited PDF Annihilator',
                'Percentile guarantee',
              ],
              cta: 'Go Elite',
              ctaClass: 'bg-hive-purple hover:bg-hive-purple/90 text-white',
              variant: 'default' as const,
            },
          ].map(({ name, price, period, color, badge, 
            features, cta, ctaClass, variant }, index) => (
            <div key={name}
              className={`reveal hive-card p-6 border ${color} relative
              hover:-translate-y-1 transition-all duration-300`}
              style={{ transitionDelay: `${index * 0.15}s` }}>
              {badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-hive-blue text-white border-0 
                    text-xs px-3">
                    {badge}
                  </Badge>
                </div>
              )}
              <div className="mb-6">
                <p className="text-hive-muted text-sm font-medium mb-2">
                  {name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {price}
                  </span>
                  <span className="text-hive-muted text-sm">
                    /{period}
                  </span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-6">
                {features.map(f => (
                  <li key={f} 
                    className="flex items-center gap-2 text-sm 
                    text-hive-muted">
                    <div className="w-1.5 h-1.5 rounded-full 
                      bg-hive-blue flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${ctaClass} transition-transform hover:-translate-y-1`} variant={variant}
                onClick={() => navigate('/dashboard')}>
                {cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="reveal border-t border-hive-border py-12 px-4" style={{ transitionDelay: '0.1s' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
          items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-hive-blue" />
            <span className="font-bold text-white">StudyHive 2.0</span>
          </div>
          <p className="text-hive-muted text-sm">
            Built for JEE · NEET · UPSC · CAT · GATE · CLAT
          </p>
          <p className="text-hive-muted text-xs">
            © 2026 StudyHive. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
