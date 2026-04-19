import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      padding: '32px 28px',
    }}>
      {[1,2,3].map(i => (
        <div key={i} style={{
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <Skeleton className="h-4 w-24 bg-hive-surface" />
          <Skeleton className="h-8 w-32 bg-hive-surface" />
          <Skeleton className="h-4 w-full bg-hive-surface" />
          <Skeleton className="h-4 w-3/4 bg-hive-surface" />
          <Skeleton className="h-20 w-full bg-hive-surface" />
          <Skeleton className="h-10 w-full bg-hive-surface" />
        </div>
      ))}
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px',
    }}>
      {[1,2,3,4].map(i => (
        <div key={i} style={{
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '18px',
          padding: '22px 20px',
        }}>
          <Skeleton className="h-3 w-20 bg-hive-surface mb-3" />
          <Skeleton className="h-10 w-28 bg-hive-surface mb-2" />
          <Skeleton className="h-3 w-full bg-hive-surface" />
        </div>
      ))}
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[1,2,3].map((i) => (
        <div key={i} style={{
          display: 'flex',
          justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
          gap: '12px',
        }}>
          {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-lg bg-hive-surface flex-shrink-0" />}
          <Skeleton 
            className="bg-hive-surface rounded-2xl"
            style={{ 
              height: '60px', 
              width: `${Math.random() * 200 + 150}px` 
            }} 
          />
        </div>
      ))}
    </div>
  )
}

export function ScheduleSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '14px',
          padding: '16px 20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          borderLeft: '3px solid #1C1C2E',
        }}>
          <Skeleton className="h-10 w-16 bg-hive-surface" />
          <div style={{ flex: 1 }}>
            <Skeleton className="h-4 w-48 bg-hive-surface mb-2" />
            <Skeleton className="h-3 w-24 bg-hive-surface" />
          </div>
          <Skeleton className="h-6 w-16 bg-hive-surface rounded-full" />
        </div>
      ))}
    </div>
  )
}
