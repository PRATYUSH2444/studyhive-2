import React from 'react'
import type { KnowledgeNode } from '@/types/user'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface GraphPanelProps {
  nodes: KnowledgeNode[]
  percentile: number
  cardsdue: number
}

export default function GraphPanel({ nodes, percentile, cardsdue }: GraphPanelProps) {
  return (
    <div data-gsap="graph-panel" className="hive-card p-5 flex flex-col gap-5">
      <div>
        <p className="text-xs text-hive-muted uppercase tracking-wider font-medium mb-3">Knowledge Graph</p>
        <div className="relative rounded-xl overflow-hidden bg-hive-surface border border-hive-border p-2">
          <svg width="100%" viewBox="0 0 260 200" className="w-full">
            <line x1="130" y1="100" x2="60"  y2="50"  stroke="#1C1C2E" strokeWidth="1.5" />
            <line x1="130" y1="100" x2="200" y2="50"  stroke="#1C1C2E" strokeWidth="1.5" />
            <line x1="130" y1="100" x2="60"  y2="160" stroke="#1C1C2E" strokeWidth="1.5" />
            <line x1="130" y1="100" x2="200" y2="160" stroke="#1C1C2E" strokeWidth="1.5" />
            <line x1="60"  y1="50"  x2="200" y2="50"  stroke="#1C1C2E" strokeWidth="1" />
            <line x1="60"  y1="160" x2="200" y2="160" stroke="#1C1C2E" strokeWidth="1" />
            <line x1="130" y1="100" x2="130" y2="20"  stroke="#1C1C2E" strokeWidth="1" />
            <line x1="130" y1="100" x2="20"  y2="100" stroke="#1C1C2E" strokeWidth="1" />

            <circle cx="130" cy="100" r="14" fill="#0EA5E9" opacity="0.9" className="knowledge-node mastered" />
            <circle cx="60"  cy="50"  r="10" fill="#22C55E" opacity="0.8" className="knowledge-node mastered" />
            <circle cx="200" cy="50"  r="10" fill="#F59E0B" opacity="0.8" className="knowledge-node shaky" />
            <circle cx="60"  cy="160" r="10" fill="#EF4444" opacity="0.9" className="knowledge-node danger" />
            <circle cx="200" cy="160" r="10" fill="#EF4444" opacity="0.8" className="knowledge-node danger" />
            <circle cx="130" cy="20"  r="7"  fill="#22C55E" opacity="0.7" className="knowledge-node mastered" />
            <circle cx="20"  cy="100" r="7"  fill="#374151" opacity="0.6" className="knowledge-node untouched" />
            <circle cx="240" cy="100" r="7"  fill="#F59E0B" opacity="0.7" className="knowledge-node shaky" />

            <text x="130" y="104" textAnchor="middle" fill="white" fontSize="7" fontWeight="600">CORE</text>
            <text x="60"  y="75"  textAnchor="middle" fill="#9CA3AF" fontSize="6">Mech</text>
            <text x="200" y="75"  textAnchor="middle" fill="#9CA3AF" fontSize="6">Thermo</text>
            <text x="60"  y="178" textAnchor="middle" fill="#9CA3AF" fontSize="6">Electro</text>
            <text x="200" y="178" textAnchor="middle" fill="#9CA3AF" fontSize="6">Optics</text>
          </svg>

          <div className="flex gap-3 mt-2 text-xs text-hive-muted justify-center pb-1">
            {[
              { color: 'bg-hive-green',  label: 'Mastered' },
              { color: 'bg-hive-gold',   label: 'Shaky' },
              { color: 'bg-hive-red',    label: 'Danger' },
              { color: 'bg-hive-muted',  label: 'Untouched' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-hive-muted uppercase tracking-wider font-medium">Score Trajectory</p>
          <Badge className="bg-hive-green/20 text-hive-green border-0 text-[10px]">
            +2.3%ile this week
          </Badge>
        </div>
        <div className="rounded-xl bg-hive-surface border border-hive-border p-3">
          <svg width="100%" viewBox="0 0 240 80" className="w-full overflow-visible">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 40, 60].map(y => (
              <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#1C1C2E" strokeWidth="1" />
            ))}
            <path d="M0,70 C40,65 80,55 120,45 C160,35 200,20 240,12 L240,80 L0,80 Z" fill="url(#lineGrad)" />
            <path data-gsap="score-line" d="M0,70 C40,65 80,55 120,45 C160,35 200,20 240,12" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="180" cy="22" r="4" fill="#0EA5E9" />
            <circle cx="180" cy="22" r="8" fill="#0EA5E9" opacity="0.2" />
          </svg>
          <div className="flex justify-between text-[10px] text-hive-muted mt-2">
            <span>30 days ago</span>
            <span className="text-hive-blue font-semibold">{percentile}%ile now</span>
            <span>Exam day</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-hive-surface border border-hive-border mt-auto">
        <div>
          <p className="text-2xl font-bold text-white">{cardsdue}</p>
          <p className="text-xs text-hive-muted">cards due today</p>
        </div>
        <Button size="sm" className="bg-hive-purple/20 text-hive-purple hover:bg-hive-purple/30 border border-hive-purple/30">
          Review Now
        </Button>
      </div>
    </div>
  )
}
