import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, MonitorPlay, 
  Zap, Map, FlaskConical } from 'lucide-react'

export default function DeepStudyPage() {
  const tools = [
    { icon: FileText, color: 'text-hive-blue',
      bg: 'bg-hive-blue/10 border-hive-blue/20',
      title: 'Smart Notes Editor',
      desc: 'ARIA auto-tags concepts, links topics, flags gaps.',
      badge: 'Active' },
    { icon: Zap, color: 'text-hive-gold',
      bg: 'bg-hive-gold/10 border-hive-gold/20',
      title: 'Concept Crystallizer',
      desc: 'Paste any text. ARIA extracts exam-relevant summary.',
      badge: null },
    { icon: MonitorPlay, color: 'text-hive-red',
      bg: 'bg-hive-red/10 border-hive-red/20',
      title: 'YouTube → Notes',
      desc: 'Paste lecture URL. Get structured notes with timestamps.',
      badge: 'Pro' },
    { icon: BookOpen, color: 'text-hive-purple',
      bg: 'bg-hive-purple/10 border-hive-purple/20',
      title: 'PDF Annihilator',
      desc: 'Upload NCERT. Get exam-ready summary with questions.',
      badge: 'Pro' },
    { icon: Map, color: 'text-hive-green',
      bg: 'bg-hive-green/10 border-hive-green/20',
      title: 'Mind Map Generator',
      desc: 'Type chapter name. Get interactive concept map.',
      badge: null },
    { icon: FlaskConical, color: 'text-hive-blue',
      bg: 'bg-hive-blue/10 border-hive-blue/20',
      title: 'Formula Vault',
      desc: 'Every formula linked to question types and memory tricks.',
      badge: null },
  ]

  return (
    <div className="max-w-6xl mx-auto" style={{ 
      padding: '32px 24px', 
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">DeepStudy</h1>
        <p className="text-hive-muted text-sm">
          Living documents that evolve with your understanding.
        </p>
      </div>
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {tools.map(({ icon: Icon, color, bg, title, desc, badge }) => (
          <div key={title}
            className="hive-card p-6 hover:border-hive-blue/40 
            transition-all duration-300 hover:-translate-y-1 
            cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl border ${bg} 
                flex items-center justify-center 
                group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              {badge && (
                <Badge className={badge === 'Pro' ? 
                  'bg-hive-purple/20 text-hive-purple border-0 text-xs' : 
                  'bg-hive-green/20 text-hive-green border-0 text-xs'}>
                  {badge}
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-hive-muted text-sm leading-relaxed mb-4">
              {desc}
            </p>
            <Button size="sm" variant="outline"
              className="border-hive-border text-hive-muted 
              hover:border-hive-blue hover:text-hive-blue w-full">
              Open Tool
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
