import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Swords, Brain, BarChart2,
  Users, BookOpen, FileText, Calendar, Flame, X,
} from 'lucide-react'

interface SidebarProps {
  expanded: boolean
  onToggle: () => void
  isMobile?: boolean
  mobileSidebarOpen?: boolean
}

const navItems = [
  { icon: LayoutDashboard, label: 'Mission Control', path: '/dashboard' },
  { icon: Swords,          label: 'Battle Arena',    path: '/battle'    },
  { icon: Brain,           label: 'ARIA Coach',      path: '/coach'     },
  { icon: BarChart2,       label: 'Analytics',       path: '/analytics' },
  { icon: Users,           label: 'Hive Rooms',      path: '/rooms'     },
  { icon: BookOpen,        label: 'DeepStudy',       path: '/study'     },
  { icon: FileText,        label: 'ExamForge',       path: '/forge'     },
  { icon: Calendar,        label: 'Scheduler',       path: '/schedule'  },
]

export default function Sidebar({ 
  expanded, onToggle, isMobile, mobileSidebarOpen 
}: SidebarProps) {
  const location = useLocation()

  const sidebarStyle: React.CSSProperties = isMobile ? {
    position: 'fixed',
    top: 0,
    left: mobileSidebarOpen ? '0' : '-280px',
    bottom: 0,
    width: '280px',
    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0F0F18',
    borderRight: '1px solid #1C1C2E',
    overflow: 'hidden',
    paddingTop: '64px',
  } : {
    position: 'fixed',
    top: '64px',
    left: 0,
    bottom: 0,
    width: expanded ? '240px' : '64px',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 40,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0F0F18',
    borderRight: '1px solid #1C1C2E',
    overflow: 'visible',
  }

  return (
    <aside style={sidebarStyle}>

      {/* Mobile close button */}
      {isMobile && (
        <button
          onClick={onToggle}
          style={{
            position: 'absolute',
            top: '72px',
            right: '16px',
            width: 32, height: 32,
            borderRadius: '8px',
            backgroundColor: '#1C1C2E',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#9CA3AF',
          }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>
      )}

      {/* Nav */}
      <nav style={{
        flex: 1,
        padding: '12px 8px',
        overflowY: 'auto',
        overflowX: isMobile ? 'hidden' : 'visible',
        scrollbarWidth: 'none',
      }}>
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path
          return (
            <div
              key={path}
              style={{ position: 'relative', marginBottom: '2px' }}
              className="sidebar-nav-group"
            >
              <Link
                to={path}
                onClick={() => isMobile && onToggle()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 12px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  borderLeft: `2px solid ${isActive ? '#0EA5E9' : 'transparent'}`,
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(14,165,233,0.15), rgba(14,165,233,0.03))'
                    : 'transparent',
                  color: isActive ? '#0EA5E9' : '#6B7280',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#13131F'
                    ;(e.currentTarget as HTMLElement).style.color = 'white'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = '#6B7280'
                  }
                }}
              >
                <Icon style={{ width: 20, height: 20, flexShrink: 0 }} />
                {(expanded || isMobile) && (
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    {label}
                  </span>
                )}
                {isActive && (expanded || isMobile) && (
                  <div style={{
                    position: 'absolute',
                    right: '10px',
                    width: 6, height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#0EA5E9',
                    boxShadow: '0 0 8px rgba(14,165,233,0.8)',
                  }} />
                )}
              </Link>

              {/* Desktop tooltip when collapsed */}
              {!expanded && !isMobile && (
                <div
                  className="sidebar-tooltip"
                  style={{
                    position: 'absolute',
                    left: '70px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#13131F',
                    border: '1px solid #1C1C2E',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'white',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.15s ease',
                    zIndex: 200,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  {label}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{
        padding: '12px 8px',
        borderTop: '1px solid #1C1C2E',
        flexShrink: 0,
      }}>
        {/* Rank card */}
        <div style={{
          overflow: 'hidden',
          maxHeight: (expanded || isMobile) ? '80px' : '0',
          opacity: (expanded || isMobile) ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease',
          marginBottom: (expanded || isMobile) ? '8px' : '0',
        }}>
          <div style={{
            backgroundColor: '#13131F',
            border: '1px solid #1C1C2E',
            borderRadius: '12px',
            padding: '12px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Scholar</span>
              <span style={{ fontSize: '12px', color: '#0EA5E9', fontWeight: 600 }}>
                2,840 XP
              </span>
            </div>
            <div style={{
              backgroundColor: '#1C1C2E',
              borderRadius: '999px',
              height: '5px',
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #0EA5E9, #8B5CF6)',
                borderRadius: '999px',
                height: '5px',
                width: '68%',
              }} />
            </div>
            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '5px' }}>
              1,160 XP to Thinker
            </p>
          </div>
        </div>

        {/* Streak */}
        <div
          onClick={() => !isMobile && onToggle()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), transparent)',
            border: '1px solid rgba(245,158,11,0.12)',
            justifyContent: (expanded || isMobile) ? 'flex-start' : 'center',
            cursor: isMobile ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{
            width: 28, height: 28,
            borderRadius: '8px',
            backgroundColor: 'rgba(245,158,11,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Flame style={{ width: 14, height: 14, color: '#F59E0B' }} />
          </div>
          <div style={{
            overflow: 'hidden',
            maxWidth: (expanded || isMobile) ? '200px' : '0',
            opacity: (expanded || isMobile) ? 1 : 0,
            transition: 'max-width 0.3s ease, opacity 0.2s ease',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>
              23 day streak
            </div>
            <div style={{ fontSize: '10px', color: '#F59E0B' }}>
              Personal best 🔥
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
