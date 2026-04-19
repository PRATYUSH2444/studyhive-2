import { useRef } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { TrendingUp, TrendingDown, Brain, 
  AlertTriangle, BarChart2 } from 'lucide-react'
import CounterAnimation from '@/components/gsap/CounterAnimation'

import { useAnalyticsOverview, usePerformanceTrend } from '@/hooks/useAnalytics'
import { useErrorDNA } from '@/hooks/useARIAData'
import { useUserStore } from '@/store/useUserStore'
import { MetricCardSkeleton } from '@/components/ui/LoadingSkeleton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'

const fallbackWeeklyData = [
  { week: 'W1', physics: 0, chemistry: 0, maths: 0 },
  { week: 'W2', physics: 0, chemistry: 0, maths: 0 },
  { week: 'W3', physics: 0, chemistry: 0, maths: 0 },
]
const radarData = [
  { subject: 'Physics', score: 78 },
  { subject: 'Chemistry', score: 71 },
  { subject: 'Maths', score: 73 },
  { subject: 'English', score: 82 },
  { subject: 'Reasoning', score: 69 },
  { subject: 'GK', score: 60 },
]

// Removed hardcoded metrics structure, now mapped dynamically

const customTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        backgroundColor: '#0F0F18',
        border: '1px solid #1C1C2E',
        borderRadius: '12px',
        padding: '12px 16px',
      }}>
        <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 8px 0' }}>
          {label}
        </p>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ 
            display: 'flex', justifyContent: 'space-between',
            gap: '16px', marginBottom: '4px',
          }}>
            <span style={{ color: p.color, fontSize: '12px', fontWeight: 500 }}>
              {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}
            </span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>
              {p.value}%
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const chartRef = useRef<HTMLDivElement>(null)
  
  const { user } = useUserStore()
  const { data: overview, isLoading, isError, refetch } = useAnalyticsOverview()
  const { data: trend } = usePerformanceTrend('90d')
  const { data: dnaData } = useErrorDNA()

  if (isLoading) return <div style={{ padding: 32 }}><MetricCardSkeleton /></div>
  if (isError) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ErrorState onRetry={refetch} /></div>

  const dynamicMetrics = [
    { label: 'Accuracy', value: overview?.accuracy || 0, suffix: '%', color: '#0EA5E9',
      trend: 0, up: true, sub: 'vs last week', decimals: 0 },
    { label: 'Questions Solved', value: overview?.questionsWeek || 0, suffix: '', color: 'white',
      trend: 0, up: true, sub: 'this week', decimals: 0 },
    { label: 'Study Hours', value: overview?.studyHoursWeek || 0, suffix: 'h', color: '#8B5CF6',
      trend: 0, up: true, sub: 'this week', decimals: 0 },
    { label: 'Predicted %ile', value: overview?.projectedPercentile || 0, suffix: '%ile', color: '#22C55E',
      trend: 0, up: true, sub: `Target: ${user?.examTarget || 'JEE'}`, decimals: 1 },
  ]

  return (
    <div style={{ 
      padding: '32px 28px 40px 28px',
      minHeight: '100%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      width: '100%',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(14,165,233,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BarChart2 style={{ width: 20, height: 20, color: '#0EA5E9' }} />
            </div>
            <h1 style={{ 
              fontSize: '26px', fontWeight: 800, color: 'white',
              margin: 0, letterSpacing: '-0.03em',
            }}>
              Cognitive Intelligence Report
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            Week 23 · {user?.examTarget || 'JEE'}
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 18px',
          borderRadius: '12px',
          backgroundColor: overview?.projectedPercentile > 80 ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
          border: overview?.projectedPercentile > 80 ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(245,158,11,0.2)',
        }}>
          <TrendingUp style={{ width: 15, height: 15, color: overview?.projectedPercentile > 80 ? '#22C55E' : '#F59E0B' }} />
          <span style={{ fontSize: '13px', fontWeight: 700, color: overview?.projectedPercentile > 80 ? '#22C55E' : '#F59E0B' }}>
            {overview?.projectedPercentile > 80 ? 'On Track' : 'Keep Going'}
          </span>
        </div>
      </div>

      {/* Metric cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '28px',
      }}>
        {dynamicMetrics.map(({ label, value, suffix, color, trend, up, sub, decimals }, i) => (
          <div key={label}
            className="metric-card"
            style={{
              backgroundColor: '#0F0F18',
              border: '1px solid #1C1C2E',
              borderRadius: '18px',
              padding: '22px 20px',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#374151'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#1C1C2E'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ 
                fontSize: '11px', color: '#6B7280', 
                fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {label}
              </span>
              <div style={{
                padding: '3px 8px',
                borderRadius: '999px',
                backgroundColor: up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${up ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                {up 
                  ? <TrendingUp style={{ width: 10, height: 10, color: '#22C55E' }} />
                  : <TrendingDown style={{ width: 10, height: 10, color: '#EF4444' }} />
                }
                <span style={{ 
                  fontSize: '10px', fontWeight: 700,
                  color: up ? '#22C55E' : '#EF4444',
                }}>
                  {trend}%
                </span>
              </div>
            </div>
            <div style={{ 
              fontSize: '40px', fontWeight: 800, color,
              lineHeight: 1, marginBottom: '8px',
              letterSpacing: '-0.03em',
            }}>
              <CounterAnimation 
                end={value} 
                suffix={suffix} 
                duration={2 + i * 0.2}
                decimals={decimals}
                className=""
              />
            </div>
            <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Performance trend chart */}
      <div ref={chartRef} style={{
        backgroundColor: '#0F0F18',
        border: '1px solid #1C1C2E',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{ 
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '24px',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <div>
            <h2 style={{ 
              fontSize: '16px', fontWeight: 700, color: 'white',
              margin: '0 0 4px 0',
            }}>
              90-Day Performance Trend
            </h2>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
              Weekly accuracy across all subjects
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { color: '#0EA5E9', label: 'Physics' },
              { color: '#22C55E', label: 'Chemistry' },
              { color: '#8B5CF6', label: 'Maths' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 24, height: 3, backgroundColor: color, borderRadius: 2 }} />
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trend?.data?.length > 0 ? trend.data : fallbackWeeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
              domain={[40, 100]}
            />
            <Tooltip content={customTooltip} />
            <Line type="monotone" dataKey="physics" stroke="#0EA5E9" 
              strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="chemistry" stroke="#22C55E" 
              strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="maths" stroke="#8B5CF6" 
              strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom 2-col */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
      }}>
        {/* Radar */}
        <div style={{
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '20px',
          padding: '24px',
          
        }}>
          <h2 style={{ 
            fontSize: '16px', fontWeight: 700, color: 'white',
            margin: '0 0 4px 0',
          }}>
            Subject Balance
          </h2>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 20px 0' }}>
            Your strengths and gaps across all subjects
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#9CA3AF', fontSize: 11 }} 
              />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              <Radar 
                dataKey="score" 
                fill="rgba(14,165,233,0.12)" 
                stroke="#0EA5E9" 
                strokeWidth={2} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Error DNA */}
        <div style={{
          backgroundColor: '#0F0F18',
          border: '1px solid #1C1C2E',
          borderRadius: '20px',
          padding: '24px',
        }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '4px',
          }}>
            <AlertTriangle style={{ width: 16, height: 16, color: '#EF4444' }} />
            <h2 style={{ 
              fontSize: '16px', fontWeight: 700, color: 'white', margin: 0,
            }}>
              Error DNA Analysis
            </h2>
          </div>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 20px 0' }}>
            ARIA identified your recurring mistake patterns
          </p>
          {(!dnaData?.patterns || dnaData.patterns.length === 0) ? (
            <EmptyState 
              icon={Brain}
              title="No error patterns yet"
              description="Answer questions to build your Error DNA profile"
              iconColor="#0EA5E9"
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {dnaData.patterns.map(({ name, subject, freq, desc }: any, i: number) => (
                <div key={name} style={{
                  padding: '16px',
                  backgroundColor: '#08080C',
                  border: '1px solid #1C1C2E',
                  borderRadius: '14px',
                  borderLeft: '3px solid rgba(239,68,68,0.6)',
                }}>
                  <div style={{ 
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '8px',
                  }}>
                    <div>
                      <p style={{ 
                        fontSize: '13px', fontWeight: 700, color: 'white',
                        margin: '0 0 4px 0',
                      }}>
                        {name}
                      </p>
                      <div style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        backgroundColor: 'rgba(14,165,233,0.1)',
                        border: '1px solid rgba(14,165,233,0.2)',
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: '#0EA5E9',
                        fontWeight: 600,
                      }}>
                        {subject}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 10px',
                      backgroundColor: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#EF4444',
                      flexShrink: 0,
                    }}>
                      {freq} times
                    </div>
                  </div>
                  <p style={{ 
                    fontSize: '11px', color: '#9CA3AF', 
                    margin: '0 0 10px 0', lineHeight: 1.5,
                  }}>
                    {desc}
                  </p>
                  <div style={{ 
                    backgroundColor: '#1C1C2E', 
                    borderRadius: '999px', 
                    height: '5px',
                  }}>
                    <div
                      className="error-bar"
                      style={{ 
                        background: 'linear-gradient(90deg, #EF4444, #F87171)',
                        borderRadius: '999px', 
                        height: '5px', 
                        width: `${freq}%`,
                        transition: 'width 1s ease',
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
