import React from 'react'
import type { User } from '@/types/user'
import { Brain, Flame } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

import { DashboardSkeleton } from '@/components/ui/LoadingSkeleton'

interface ARIABriefPanelProps {
  user: User | null
  brief?: string
  urgentTopic?: string
  daysToExam?: number
  projectedPercentile?: number
  accuracy?: number
  streak?: number
}

export default function ARIABriefPanel({ 
  user, brief, urgentTopic, daysToExam, projectedPercentile, accuracy, streak 
}: ARIABriefPanelProps) {
  if (!user) return <div className="hive-card p-5"><div className="animate-pulse bg-hive-surface h-full w-full rounded" /></div>
  return (
    <div data-gsap="aria-panel" className="hive-card p-5 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="aria-icon w-12 h-12 rounded-xl bg-hive-blue/20 border border-hive-blue/50 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-6 h-6 text-hive-blue" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-hive-green border-2 border-hive-card" />
        </div>
        <div>
          <p className="text-xs text-hive-muted font-medium uppercase tracking-wider">ARIA Daily Brief</p>
          <p className="text-white font-semibold">Good morning, {user.name?.split(' ')[0] || 'Student'} 👋</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-hive-blue/10 border border-hive-blue/20">
        <div>
          <p className="text-2xl font-bold text-white">{daysToExam || 0}</p>
          <p className="text-xs text-hive-muted">days to {user.examTarget || 'JEE'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-hive-blue">{projectedPercentile || 0}%ile</p>
          <p className="text-xs text-hive-muted">projected</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-hive-surface border-l-2 border-hive-blue text-sm text-hive-muted leading-relaxed">
        {brief || 'ARIA is analyzing your performance array to generate an optimized daily strategy. Check back after your first session.'}
      </div>

      <div>
        <p className="text-xs text-hive-muted uppercase tracking-wider font-medium mb-3">Today's Non-Negotiables</p>
        <div className="flex flex-col gap-2">
          {[
            { priority: 'high', subject: 'Chemistry', task: 'Electrochemistry — 25 questions', color: '#EF4444' },
            { priority: 'med', subject: 'Physics', task: 'Optics revision — 40 min', color: '#F59E0B' },
            { priority: 'low', subject: 'Maths', task: 'Integration practice set', color: '#22C55E' },
          ].map((item, i) => (
            <div key={i} className="task-card hive-card p-3 flex items-start gap-3" style={{ borderLeft: `3px solid ${item.color}` }}>
              <Checkbox className="mt-0.5 border-hive-border" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-snug">{item.task}</p>
                <Badge variant="outline" className="text-xs mt-1 border-hive-border text-hive-muted">{item.subject}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-hive-border">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-hive-gold" />
          <span className="text-sm font-semibold text-white">{streak || 0} day streak</span>
        </div>
        <Badge className="bg-hive-gold/20 text-hive-gold border-0 text-xs">Personal best!</Badge>
      </div>
    </div>
  )
}
