import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  iconColor?: string
  iconBg?: string
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  iconColor = '#6B7280',
  iconBg = 'rgba(107,114,128,0.1)',
}: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: 64, height: 64,
        borderRadius: '18px',
        backgroundColor: iconBg,
        border: `1px solid ${iconColor}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon style={{ width: 28, height: 28, color: iconColor }} />
      </div>
      <div>
        <p style={{ 
          fontSize: '16px', fontWeight: 700, 
          color: 'white', margin: '0 0 6px 0',
        }}>
          {title}
        </p>
        <p style={{ 
          fontSize: '13px', color: '#6B7280', 
          margin: 0, maxWidth: '280px',
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          style={{ backgroundColor: '#0EA5E9', color: 'white' }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
