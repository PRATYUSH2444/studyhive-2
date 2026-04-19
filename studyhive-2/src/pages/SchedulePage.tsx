import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Target, Zap } from 'lucide-react'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useUserStore } from '@/store/useUserStore'
import { useTodaySchedule, useGenerateSchedule } from '@/hooks/useScheduler'
import { ScheduleSkeleton } from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'

export default function SchedulePage() {
  const { isMobile } = useBreakpoint()
  const { user } = useUserStore()
  
  const { data: scheduleData, isLoading, isError, refetch } = useTodaySchedule()
  const { mutate: generate, isPending: isGenerating } = useGenerateSchedule()

  const schedule = scheduleData || []


  const colors: Record<string, string> = {
    high: 'border-hive-red',
    med: 'border-hive-gold',
    low: 'border-hive-border',
  }

  const typeColors: Record<string, string> = {
    Study: 'bg-hive-blue/20 text-hive-blue',
    Practice: 'bg-hive-purple/20 text-hive-purple',
    Test: 'bg-hive-red/20 text-hive-red',
    Review: 'bg-hive-green/20 text-hive-green',
    Break: 'bg-hive-surface text-hive-muted',
  }

  if (isLoading) return <div style={{ padding: '32px 24px' }} className="max-w-4xl mx-auto"><ScheduleSkeleton /></div>
  if (isError) return <div style={{ padding: '32px 24px' }} className="max-w-4xl mx-auto"><ErrorState onRetry={refetch} /></div>

  const daysToExam = user?.examDate
    ? Math.max(0, Math.ceil((new Date(user.examDate).getTime() - Date.now()) / 86400000))
    : 47

  return (
    <div className="max-w-4xl mx-auto" style={{ 
      padding: '32px 24px', 
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Smart Scheduler
          </h1>
          <p className="text-hive-muted text-sm">
            ARIA-built. Adjusts daily based on your performance.
          </p>
        </div>
        <Button 
          className="bg-hive-purple hover:bg-hive-purple/90 text-white"
          disabled={isGenerating}
          onClick={() => {
            generate({
              targetPercentile: 90,
              availableHours: 6,
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
            })
          }}
        >
          <Zap className="w-4 h-4 mr-2" />
          {isGenerating ? 'Analyzing...' : 'Regenerate Plan'}
        </Button>
      </div>

      <div className="hive-card p-4 mb-6 flex items-center gap-6">
        {[
          { icon: Calendar, label: 'Today', value: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) },
          { icon: Target, label: 'Exam', value: user?.examTarget || 'JEE' },
          { icon: Clock, label: 'Days Left', value: `${daysToExam} days` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-hive-blue" />
            <div>
              <p className="text-xs text-hive-muted">{label}</p>
              <p className="text-sm font-semibold text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {schedule.length === 0 ? (
          <EmptyState 
            icon={Target} 
            title="No schedule found" 
            description="Hit regenerate to build your optimized daily strategy based on current memory decay signatures."
          />
        ) : (
          schedule.map((item: any) => (
            <div key={item.id}
              className={`hive-card p-4 flex hover:border-hive-blue/40 transition-colors border-l-2 ${colors[item.priority] || colors.med}`}
              style={{ 
                flexDirection: isMobile ? 'column' : 'row', 
                alignItems: isMobile ? 'flex-start' : 'center',
                gap: isMobile ? '8px' : '16px'
              }}>
              <div className="flex-shrink-0" 
                   style={{ 
                     display: isMobile ? 'flex' : 'block',
                     flexDirection: isMobile ? 'row' : 'column',
                     gap: isMobile ? '8px' : '0px',
                     alignItems: isMobile ? 'center' : 'flex-start',
                     width: isMobile ? 'auto' : '80px' 
                   }}>
                <p className="text-sm font-mono font-semibold text-white">
                  {item.time || new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-xs text-hive-muted">{item.duration || `${item.plannedMinutes} min`}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">
                  {item.topic}
                </p>
                <Badge variant="outline" 
                  className="text-xs border-hive-border text-hive-muted">
                  {item.subject}
                </Badge>
              </div>
              <Badge className={`text-xs border-0 ${typeColors[item.type] || typeColors.Study}`}>
                {item.type || 'Study'}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
