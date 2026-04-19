import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  compact?: boolean
}

export default function ErrorState({ 
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
  compact = false,
}: ErrorStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: compact ? '24px' : '48px',
      gap: '12px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 48, height: 48,
        borderRadius: '14px',
        backgroundColor: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <AlertTriangle style={{ width: 22, height: 22, color: '#EF4444' }} />
      </div>
      {!compact && (
        <div>
          <p style={{ 
            fontSize: '15px', fontWeight: 700, 
            color: 'white', margin: '0 0 4px 0' 
          }}>
            {title}
          </p>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            {message}
          </p>
        </div>
      )}
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          style={{ 
            borderColor: '#1C1C2E', 
            color: '#9CA3AF',
            marginTop: '4px',
          }}
        >
          <RefreshCw style={{ width: 14, height: 14, marginRight: '6px' }} />
          Try again
        </Button>
      )}
    </div>
  )
}
