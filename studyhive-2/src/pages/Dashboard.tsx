import ARIABriefPanel from '@/components/dashboard/ARIABriefPanel'
import LiveFeedPanel from '@/components/dashboard/LiveFeedPanel'
import GraphPanel from '@/components/dashboard/GraphPanel'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useUserStore } from '@/store/useUserStore'
import { useAnalyticsOverview } from '@/hooks/useAnalytics'
import { useDailyBrief, useKnowledgeGraph } from '@/hooks/useARIAData'
import { DashboardSkeleton } from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'

export default function Dashboard() {
  const { isMobile, isTablet, width } = useBreakpoint()
  const { user } = useUserStore()

  const { 
    data: analytics, 
    isLoading: analyticsLoading,
    isError: analyticsError,
    refetch: refetchAnalytics,
  } = useAnalyticsOverview()

  const { 
    data: briefData,
    isLoading: briefLoading,
  } = useDailyBrief()

  const {
    data: graphData,
  } = useKnowledgeGraph()

  const isLoading = analyticsLoading || briefLoading

  const daysToExam = user?.examDate
    ? Math.max(0, Math.ceil(
        (new Date(user.examDate).getTime() - Date.now()) / 86400000
      ))
    : 47

  if (isLoading) return <DashboardSkeleton />
  if (analyticsError) return <ErrorState onRetry={refetchAnalytics} />

  return (
    <div style={{ 
      padding: '32px 24px 24px 24px',
      minHeight: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 800, 
            color: 'white',
            margin: 0,
            letterSpacing: '-0.03em',
          }}>
            Mission Control
          </h1>
          <p style={{ 
            fontSize: '13px', 
            color: '#6B7280', 
            marginTop: '4px',
            margin: '4px 0 0 0',
          }}>
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
            })}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          borderRadius: '12px',
          backgroundColor: 'rgba(14,165,233,0.08)',
          border: '1px solid rgba(14,165,233,0.2)',
          flexShrink: 0,
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#0EA5E9',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#0EA5E9',
            whiteSpace: 'nowrap',
          }}>
            {daysToExam} days to {user?.examTarget || 'Exam'}
          </span>
        </div>
      </div>

      {/* 3 panel grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 
          width < 768 ? '1fr' :
          width < 1024 ? '1fr 1fr' :
          '300px 1fr 300px',
        gap: '20px',
        alignItems: 'start',
      }}>
        <ARIABriefPanel 
          user={user}
          brief={briefData?.brief}
          urgentTopic={briefData?.urgentTopic}
          daysToExam={daysToExam}
          projectedPercentile={analytics?.projectedPercentile || 0}
          accuracy={analytics?.accuracy || 0}
          streak={user?.streak || 0}
        />
        <LiveFeedPanel items={[]} />
        <GraphPanel 
          nodes={graphData?.nodes || []} 
          percentile={analytics?.projectedPercentile || 0}
          cardsdue={analytics?.flashcardsDue || 0}
        />
      </div>
    </div>
  )
}
