import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import type { Battle, Question } from '@/types/battle'
import type { User } from '@/types/user'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Flag, Flame } from 'lucide-react'
import { 
  animateQuestionIn, 
  animateCorrectAnswer, 
  animateWrongAnswer,
  animateTimerUrgency,
  animateTimerCritical,
} from '@/hooks/useBattleAnimations'

interface BattleArenaProps {
  battle?: Battle
  currentUser?: User
}

export default function BattleArena({ battle, currentUser }: BattleArenaProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  
  const question: any = {
    id: 'Q-001',
    subject: 'Physics',
    topic: 'Optics',
    difficulty: 'hard',
    type: 'mcq',
    text: 'A convex lens of focal length 20 cm is placed at a distance of 60 cm from a screen. How far from the lens should an object be placed so that its image is formed on the screen?',
    options: [
      { id: 'A', text: '30 cm', isCorrect: true },
      { id: 'B', text: '45 cm', isCorrect: false },
      { id: 'C', text: '60 cm', isCorrect: false },
      { id: 'D', text: '15 cm', isCorrect: false }
    ],
    explanation: 'Using lens formula 1/f = 1/v - 1/u, where f=20cm, v=60cm...'
  }
  
  const questionRef = useRef<HTMLDivElement>(null)
  const timerTextRef = useRef<HTMLSpanElement>(null)
  const [timeLeft, setTimeLeft] = useState(90)
  const [timerUrgent, setTimerUrgent] = useState(false)

  // Initial entrance animation
  useGSAP(() => {
    // VS text dramatic entrance
    gsap.from('.vs-text', {
      scale: 0, opacity: 0, 
      duration: 0.8, ease: 'back.out(2)', delay: 0.3
    })
    
    // Player cards slide in from sides
    gsap.from('.player-left', {
      x: -80, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out'
    })
    gsap.from('.player-right', {
      x: 80, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out'
    })

    // Health bars animate from 0
    gsap.from('.health-bar-fill', {
      scaleX: 0, duration: 1, delay: 0.5, ease: 'power2.out',
      transformOrigin: 'left center',
    })

    // Question card fly in
    if (questionRef.current) {
      animateQuestionIn(questionRef.current)
    }

    // Option cards stagger entrance
    gsap.from('.option-card', {
      opacity: 0, y: 30, scale: 0.95,
      stagger: 0.08, duration: 0.5, delay: 0.6,
      ease: 'back.out(1.5)',
    })

    // Timer ring draw
    const timerRing = document.querySelector(
      '[data-gsap="battle-timer-ring"]'
    ) as SVGCircleElement | null
    if (timerRing) {
      gsap.fromTo(timerRing,
        { strokeDashoffset: 283 },
        { 
          strokeDashoffset: 0, 
          duration: 1, 
          ease: 'power2.out', 
          delay: 0.5 
        }
      )
    }
  }, {})

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1
        if (next === 10 && !timerUrgent) {
          setTimerUrgent(true)
          animateTimerUrgency(timerTextRef.current)
        }
        if (next === 5) {
          animateTimerCritical(timerTextRef.current)
        }
        if (next <= 0) {
          clearInterval(interval)
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerUrgent])

  const handleAnswer = (key: string) => {
    if (selectedAnswer) return
    setSelectedAnswer(key)
    const el = document.querySelector(`[data-gsap="option-${key}"]`)
    
    // 'A' is correct in mock — change this for real questions
    if (key === 'A') {
      animateCorrectAnswer(el)
    } else {
      animateWrongAnswer(el)
      // Also highlight correct answer
      setTimeout(() => {
        const correctEl = document.querySelector('[data-gsap="option-A"]')
        if (correctEl) {
          gsap.to(correctEl, { 
            borderColor: '#22C55E',
            backgroundColor: 'rgba(34,197,94,0.08)',
            duration: 0.4 
          })
        }
      }, 600)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="hive-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="player-left flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-hive-red/50">
                <AvatarFallback className="bg-hive-red/20 text-hive-red text-sm font-bold">RK</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-white">Rahul K.</p>
                <Badge variant="outline" className="text-[10px] border-hive-border text-hive-muted px-1.5 py-0 h-4">ELO 1847</Badge>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="vs-text text-2xl font-display font-bold text-gradient-hive">VS</span>
              <div className="flex gap-2">
                <Badge className="bg-hive-blue/20 text-hive-blue border-0 text-[10px] py-0 h-4 px-1.5">Physics</Badge>
                <Badge className="bg-hive-purple/20 text-hive-purple border-0 text-[10px] py-0 h-4 px-1.5">Optics</Badge>
              </div>
              <p className="text-xs text-hive-muted">Round 3 of 10</p>
            </div>

            <div className="player-right flex items-center gap-3 flex-row-reverse">
              <Avatar className="w-10 h-10 border-2 border-hive-blue/50">
                <AvatarFallback className="bg-hive-blue/20 text-hive-blue text-sm font-bold">ME</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">You</p>
                <Badge variant="outline" className="text-[10px] border-hive-border text-hive-muted px-1.5 py-0 h-4">ELO 1923</Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-hive-muted w-16 text-right">Rahul</span>
              <Progress value={60} className="health-bar-fill flex-1 h-2 bg-hive-surface [&>div]:bg-hive-red" />
              <span className="text-xs text-hive-red font-mono w-8">60%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-hive-muted w-16 text-right">You</span>
              <Progress value={80} className="health-bar-fill flex-1 h-2 bg-hive-surface [&>div]:bg-hive-blue" />
              <span className="text-xs text-hive-blue font-mono w-8">80%</span>
            </div>
          </div>
        </div>

        <div ref={questionRef} className="hive-card p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-hive-border text-hive-muted">Question 3 / 10</Badge>
            <Badge className="bg-hive-gold/20 text-hive-gold border-0">Difficulty: Hard</Badge>
          </div>

          <p className="text-lg sm:text-xl text-white font-medium leading-relaxed mb-8 flex-1">
            A convex lens of focal length 20 cm is placed at a distance of 60 cm from a screen. How far from the lens should an object be placed so that its image is formed on the screen?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
            {[
              { key: 'A', text: '30 cm' },
              { key: 'B', text: '45 cm' },
              { key: 'C', text: '60 cm' },
              { key: 'D', text: '15 cm' },
            ].map(({ key, text }) => (
              <button
                key={key}
                data-gsap={`option-${key}`}
                onClick={() => handleAnswer(key)}
                disabled={!!selectedAnswer}
                className={`option-card hive-card p-4 text-left flex items-center gap-4 hover:border-hive-blue transition-all duration-200 cursor-pointer group disabled:cursor-not-allowed
                  ${selectedAnswer === key ? (key === 'A' ? 'answer-correct' : 'answer-wrong') : ''}`}
              >
                <span className="w-8 h-8 rounded-lg border border-hive-border flex items-center justify-center text-sm font-mono text-hive-muted group-hover:border-hive-blue group-hover:text-hive-blue transition-colors font-semibold">
                  {key}
                </span>
                <span className="text-white text-sm font-medium">{text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-hive-border text-hive-muted hover:border-hive-red hover:text-hive-red hover:bg-hive-card">
            <Flag className="w-4 h-4 mr-2" />
            Surrender
          </Button>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-hive-gold" />
            <span className="text-sm text-white font-semibold">5 streak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-hive-green animate-pulse" />
            <span className="text-xs text-hive-muted">Connected</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-72 flex flex-col gap-4">
        <div className="hive-card p-5 flex flex-col items-center gap-3">
          <p className="text-xs text-hive-muted uppercase tracking-wider">Time Remaining</p>
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1C1C2E" strokeWidth="6" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="70" data-gsap="battle-timer-ring" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span ref={timerTextRef} data-gsap="battle-timer-text" className="text-3xl font-mono font-bold text-white">{timeLeft}</span>
              <span className="text-xs text-hive-muted">sec</span>
            </div>
          </div>
        </div>

        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider mb-3">Opponent Activity</p>
          <div className="flex gap-2 mb-3">
            {['correct', 'wrong', 'correct'].map((r, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${r === 'correct' ? 'bg-hive-green/20 text-hive-green' : 'bg-hive-red/20 text-hive-red'}`}>
                {r === 'correct' ? '✓' : '✗'}
              </div>
            ))}
            <div className="w-8 h-8 rounded-lg bg-hive-surface border border-hive-border animate-pulse" />
          </div>
          <div className="flex justify-between text-xs text-hive-muted mt-2 border-t border-hive-border pt-2">
            <span>Accuracy: 67%</span>
            <span>Avg: 42s</span>
          </div>
        </div>

        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider mb-3">Your Stats</p>
          {[
            { label: 'Correct', value: '2/3', color: 'text-hive-green' },
            { label: 'Avg Speed', value: '38s', color: 'text-hive-blue' },
            { label: 'Points', value: '+240', color: 'text-hive-gold' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-hive-border last:border-0 hover:bg-hive-surface px-1 -mx-1 rounded transition-colors">
              <span className="text-sm text-hive-muted">{label}</span>
              <span className={`text-sm font-bold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
