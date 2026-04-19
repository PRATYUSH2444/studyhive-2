import ARIAChat from '@/components/aria/ARIAChat'

export default function AICoachPage() {
  return (
    <div style={{ 
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      padding: '0',
    }}>
      <ARIAChat initialMode="supportive" />
    </div>
  )
}
