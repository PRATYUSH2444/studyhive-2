import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Brain, Target, Clock } from 'lucide-react'

export default function ExamForgePage() {
  return (
    <div className="max-w-6xl mx-auto" style={{ 
      padding: '32px 24px', 
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">ExamForge</h1>
        <p className="text-hive-muted text-sm">
          AI-generated papers. Never the same twice.
        </p>
      </div>
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {[
          { icon: Brain, color: 'text-hive-blue',
            bg: 'bg-hive-blue/10 border-hive-blue/20',
            title: 'AI Paper Generator',
            desc: 'Select topics, difficulty, duration. ARIA generates a unique full paper calibrated to your weak areas.',
            badge: 'Unlimited', cta: 'Generate Paper' },
          { icon: Target, color: 'text-hive-red',
            bg: 'bg-hive-red/10 border-hive-red/20',
            title: 'Predict This Year\'s Paper',
            desc: '10 years of patterns analyzed. Highest probability topics and question types for your exam.',
            badge: 'Elite', cta: 'Get Prediction' },
          { icon: FileText, color: 'text-hive-purple',
            bg: 'bg-hive-purple/10 border-hive-purple/20',
            title: 'PYQ Intelligence',
            desc: 'All previous year questions tagged by concept, difficulty, frequency. ARIA finds likely repeats.',
            badge: 'Free', cta: 'Browse PYQs' },
          { icon: Clock, color: 'text-hive-gold',
            bg: 'bg-hive-gold/10 border-hive-gold/20',
            title: 'Adaptive Full-Length Test',
            desc: 'Test adapts in real-time. Predicts your actual exam percentile with 89% accuracy.',
            badge: 'Pro', cta: 'Start Test' },
        ].map(({ icon: Icon, color, bg, title, desc, badge, cta }) => (
          <div key={title}
            className="hive-card p-6 hover:border-hive-blue/40 
            transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl border ${bg} 
                flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <Badge className="bg-hive-surface text-hive-muted 
                border-hive-border text-xs">
                {badge}
              </Badge>
            </div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-hive-muted text-sm leading-relaxed mb-4">
              {desc}
            </p>
            <Button className="bg-hive-blue hover:bg-hive-blue/90 
              text-white w-full">
              {cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
