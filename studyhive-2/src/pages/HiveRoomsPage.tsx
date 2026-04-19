import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Volume2, BookOpen, Zap, 
  CheckSquare, Plus } from 'lucide-react'

export default function HiveRoomsPage() {
  const rooms = [
    { type: 'Silent Hive', icon: Volume2, color: 'text-hive-blue',
      bg: 'bg-hive-blue/10 border-hive-blue/20',
      desc: 'Pomodoro focus. No chat. Pure study.',
      members: 847, active: true },
    { type: 'Discussion Hive', icon: Users, color: 'text-hive-green',
      bg: 'bg-hive-green/10 border-hive-green/20',
      desc: 'Live chat + whiteboard + voice.',
      members: 234, active: true },
    { type: 'Lecture Hive', icon: BookOpen, color: 'text-hive-purple',
      bg: 'bg-hive-purple/10 border-hive-purple/20',
      desc: 'One teaches, rest attend. Recorded.',
      members: 156, active: false },
    { type: 'Battle Hive', icon: Zap, color: 'text-hive-red',
      bg: 'bg-hive-red/10 border-hive-red/20',
      desc: 'Solve same question. Fastest wins.',
      members: 423, active: true },
    { type: 'Accountability Hive', icon: CheckSquare, 
      color: 'text-hive-gold',
      bg: 'bg-hive-gold/10 border-hive-gold/20',
      desc: 'Daily check-in. State goals. Commit.',
      members: 91, active: false },
  ]

  return (
    <div className="max-w-6xl mx-auto" style={{ 
      padding: '32px 24px', 
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Hive Rooms
          </h1>
          <p className="text-hive-muted text-sm">
            Study together. Compete. Grow.
          </p>
        </div>
        <Button className="bg-hive-blue hover:bg-hive-blue/90 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Button>
      </div>
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {rooms.map(({ type, icon: Icon, color, bg, desc, 
          members, active }) => (
          <div key={type} 
            className="hive-card p-6 hover:border-hive-blue/40 
            transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl border ${bg} 
                flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              {active && (
                <Badge className="bg-hive-green/20 text-hive-green 
                  border-0 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full 
                    bg-hive-green mr-1.5 animate-pulse inline-block" />
                  Live
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-white mb-2">{type}</h3>
            <p className="text-hive-muted text-sm mb-4">{desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-hive-muted">
                {members.toLocaleString()} members
              </span>
              <Button size="sm" variant="outline"
                className="border-hive-border text-hive-muted 
                hover:border-hive-blue hover:text-hive-blue">
                Join Room
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
