import { useState } from 'react'
import BattleArena from '@/components/battle/BattleArena'
import { useUserStore } from '@/store/useUserStore'
import useBreakpoint from '@/hooks/useBreakpoint'
import { Swords, Zap, Shield, Skull, Trophy, Target, 
  Users, Flame } from 'lucide-react'

type BattleMode = '1v1' | 'blitz' | 'gauntlet' | 'boss' | null

export default function BattleArenaPage() {
  const { isMobile } = useBreakpoint()
  const { user } = useUserStore()
  const [selectedMode, setSelectedMode] = useState<BattleMode>(null)

  if (selectedMode === '1v1') {
    return (
      <div style={{ 
        padding: '24px',
        minHeight: '100%',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => setSelectedMode(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#13131F',
            border: '1px solid #1C1C2E',
            borderRadius: '10px',
            color: '#6B7280',
            fontSize: '13px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          ← Back to modes
        </button>
        <BattleArena currentUser={user || undefined} />
      </div>
    )
  }

  const modes = [
    {
      id: '1v1' as BattleMode,
      icon: Swords,
      iconColor: '#0EA5E9',
      iconBg: 'rgba(14,165,233,0.12)',
      iconBorder: 'rgba(14,165,233,0.25)',
      title: '1v1 Lightning',
      subtitle: 'Real opponent · 10 questions · 90s each',
      description: 'ARIA matches you with someone at your exact ELO. Questions target both your weak spots.',
      badge: { text: 'Most Popular', bg: 'rgba(14,165,233,0.12)', color: '#0EA5E9', border: 'rgba(14,165,233,0.3)' },
      stats: [
        { label: 'Avg duration', value: '15 min' },
        { label: 'Online now', value: '2,847' },
        { label: 'Your win rate', value: '67%' },
      ],
      cta: 'Find Opponent',
      ctaBg: '#0EA5E9',
      ctaColor: 'white',
      hoverBorder: '#0EA5E9',
      hoverGlow: 'rgba(14,165,233,0.15)',
    },
    {
      id: 'blitz' as BattleMode,
      icon: Zap,
      iconColor: '#F59E0B',
      iconBg: 'rgba(245,158,11,0.12)',
      iconBorder: 'rgba(245,158,11,0.25)',
      title: 'Daily Blitz',
      subtitle: 'Community-wide · 5 questions · 7 AM daily',
      description: 'Same 5 questions for every student. See how you rank against 47,000+ students.',
      badge: { text: '● Today\'s blitz active', bg: 'rgba(34,197,94,0.1)', color: '#22C55E', border: 'rgba(34,197,94,0.3)' },
      stats: [
        { label: 'Taken today', value: '12,493' },
        { label: 'Your rank', value: '#847' },
        { label: 'Avg score', value: '3/5' },
      ],
      cta: 'Join Now',
      ctaBg: 'transparent',
      ctaColor: '#F59E0B',
      ctaBorder: '#F59E0B',
      hoverBorder: '#F59E0B',
      hoverGlow: 'rgba(245,158,11,0.12)',
    },
    {
      id: 'gauntlet' as BattleMode,
      icon: Shield,
      iconColor: '#8B5CF6',
      iconBg: 'rgba(139,92,246,0.12)',
      iconBorder: 'rgba(139,92,246,0.25)',
      title: 'The Gauntlet',
      subtitle: 'Solo · 100 questions · Adaptive difficulty',
      description: 'ARIA tracks your performance curve. When do you start making silly mistakes?',
      badge: null,
      stats: [
        { label: 'Best score', value: '78/100' },
        { label: 'Global rank', value: '#2,341' },
        { label: 'Avg time', value: '94 min' },
      ],
      cta: 'Start Gauntlet',
      ctaBg: '#8B5CF6',
      ctaColor: 'white',
      hoverBorder: '#8B5CF6',
      hoverGlow: 'rgba(139,92,246,0.12)',
    },
    {
      id: 'boss' as BattleMode,
      icon: Skull,
      iconColor: '#EF4444',
      iconBg: 'rgba(239,68,68,0.12)',
      iconBorder: 'rgba(239,68,68,0.25)',
      title: 'Boss Battle',
      subtitle: 'Weekly · Electrochemistry · Extreme mode',
      description: 'One ultra-hard multi-concept question. First 100 correct get Boss Slayer badge.',
      badge: { text: '89 slayers so far', bg: 'rgba(239,68,68,0.08)', color: '#EF4444', border: 'rgba(239,68,68,0.25)' },
      stats: [
        { label: 'Solved by', value: '89 / ∞' },
        { label: 'Difficulty', value: '9.4/10' },
        { label: 'Resets in', value: '3 days' },
      ],
      cta: 'Challenge Boss',
      ctaBg: 'transparent',
      ctaColor: '#EF4444',
      ctaBorder: '#EF4444',
      hoverBorder: '#EF4444',
      hoverGlow: 'rgba(239,68,68,0.1)',
    },
  ]

  return (
    <div style={{ 
      padding: '32px 28px',
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.2))',
            border: '1px solid rgba(14,165,233,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Swords style={{ width: 22, height: 22, color: '#0EA5E9' }} />
          </div>
          <div>
            <h1 style={{ 
              fontSize: '28px', fontWeight: 800, color: 'white',
              margin: 0, letterSpacing: '-0.03em',
            }}>
              Battle Arena
            </h1>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: '3px 0 0 0' }}>
              Where dopamine lives. Choose your battlefield.
            </p>
          </div>
        </div>

        {/* Live stats bar */}
        <div style={{
          display: 'flex', gap: '24px', flexWrap: 'wrap',
          padding: '14px 20px',
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '14px',
          marginTop: '20px',
        }}>
          {[
            { icon: Users, value: '2,847', label: 'in battles now', color: '#0EA5E9' },
            { icon: Trophy, value: user?.rank?.toString() || 'Unranked', label: 'your tier', color: '#F59E0B' },
            { icon: Target, value: user?.projectedPercentile ? `${user.projectedPercentile}%` : '67%', label: 'win rate this week', color: '#22C55E' },
            { icon: Flame, value: user?.streak?.toString() || '0', label: 'day streak', color: '#EF4444' },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} style={{ 
              display: 'flex', alignItems: 'center', gap: '10px',
              minWidth: isMobile ? 'calc(50% - 6px)' : 'auto',
            }}>
              <div style={{
                width: 32, height: 32,
                borderRadius: '8px',
                backgroundColor: `${color}14`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon style={{ width: 15, height: 15, color }} />
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'white', lineHeight: 1.1 }}>
                  {value}
                </div>
                <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.1 }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle mode cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',
      }}>
        {modes.map(({ id, icon: Icon, iconColor, iconBg, iconBorder,
          title, subtitle, description, badge, stats, 
          cta, ctaBg, ctaColor, ctaBorder, hoverBorder, hoverGlow }) => (
          <div
            key={id}
            onClick={() => setSelectedMode(id)}
            style={{
              backgroundColor: '#0F0F18',
              border: '1px solid #1C1C2E',
              borderRadius: '20px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = hoverBorder
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = `0 12px 40px ${hoverGlow}`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = '#1C1C2E'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Top row: icon + badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: 52, height: 52,
                borderRadius: '14px',
                backgroundColor: iconBg,
                border: `1px solid ${iconBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon style={{ width: 24, height: 24, color: iconColor }} />
              </div>
              {badge && (
                <div style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  backgroundColor: badge.bg,
                  border: `1px solid ${badge.border}`,
                  color: badge.color,
                  fontSize: '11px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>
                  {badge.text}
                </div>
              )}
            </div>

            {/* Title + subtitle + desc */}
            <div>
              <h3 style={{ 
                fontSize: '20px', fontWeight: 700, color: 'white',
                margin: '0 0 4px 0',
              }}>
                {title}
              </h3>
              <p style={{ 
                fontSize: '12px', color: iconColor, 
                margin: '0 0 10px 0', fontWeight: 500,
              }}>
                {subtitle}
              </p>
              <p style={{ 
                fontSize: '13px', color: '#9CA3AF',
                margin: 0, lineHeight: 1.6,
              }}>
                {description}
              </p>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              padding: '16px',
              backgroundColor: '#08080C',
              borderRadius: '12px',
              border: '1px solid #1C1C2E',
            }}>
              {stats.map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '15px', fontWeight: 700, color: 'white',
                    lineHeight: 1.2,
                  }}>
                    {value}
                  </div>
                  <div style={{ 
                    fontSize: '10px', color: '#6B7280',
                    marginTop: '2px', lineHeight: 1.2,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <button
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                backgroundColor: ctaBg,
                color: ctaColor,
                border: ctaBorder ? `1px solid ${ctaBorder}` : 'none',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.opacity = '0.85'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(0.99)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = '1'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              {cta}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom — recent battles */}
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ 
          fontSize: '16px', fontWeight: 700, color: 'white',
          margin: '0 0 16px 0',
        }}>
          Recent Battles
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { opponent: 'Rahul K.', subject: 'Physics · Optics', result: 'won', score: '8/10', elo: '+24', time: '2h ago' },
            { opponent: 'Anjali M.', subject: 'Chemistry · Organic', result: 'lost', score: '5/10', elo: '-18', time: '5h ago' },
            { opponent: 'Priya S.', subject: 'Maths · Integration', result: 'won', score: '9/10', elo: '+31', time: '1d ago' },
          ].map(({ opponent, subject, result, score, elo, time }) => (
            <div key={opponent} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: isMobile ? '12px 14px' : '16px 20px',
              backgroundColor: '#0F0F18',
              border: '1px solid #1C1C2E',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#374151'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#1C1C2E'}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '10px',
                backgroundColor: result === 'won' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                border: `1px solid ${result === 'won' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Swords style={{ 
                  width: 16, height: 16, 
                  color: result === 'won' ? '#22C55E' : '#EF4444',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>
                  vs {opponent}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {subject} · {time}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>
                  {score}
                </div>
                <div style={{ 
                  fontSize: '12px', fontWeight: 600,
                  color: result === 'won' ? '#22C55E' : '#EF4444',
                }}>
                  {elo} ELO
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
