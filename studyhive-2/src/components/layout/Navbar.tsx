import { useLocation, useNavigate } from 'react-router-dom'
import { Brain, Bell, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserStore } from '@/store/useUserStore'
import { useState } from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import useBreakpoint from '@/hooks/useBreakpoint'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Mission Control',
  '/battle':    'Battle Arena',
  '/coach':     'ARIA Coach',
  '/analytics': 'Analytics',
  '/rooms':     'Hive Rooms',
  '/study':     'DeepStudy',
  '/forge':     'ExamForge',
  '/schedule':  'Scheduler',
}

interface NavbarProps {
  onMobileMenuToggle?: () => void
  isMobile?: boolean
  mobileSidebarOpen?: boolean
}

export default function Navbar({ 
  onMobileMenuToggle, 
  isMobile,
  mobileSidebarOpen,
}: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isDesktop } = useBreakpoint()
  const isLanding = location.pathname === '/'
  const pageTitle = pageTitles[location.pathname]
  
  const { user, isAuthenticated, logout } = useUserStore()
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: notifications } = useNotifications()

  const hasUnread = notifications?.some((n: any) => !n.read)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '64px',
      zIndex: 50,
      backgroundColor: 'rgba(8,8,12,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #1C1C2E',
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '0 16px' : '0 24px',
      gap: isMobile ? '10px' : '16px',
    }}>

      {/* Mobile hamburger */}
      {isMobile && !isLanding && (
        <button
          onClick={onMobileMenuToggle}
          style={{
            width: 36, height: 36,
            borderRadius: '10px',
            backgroundColor: mobileSidebarOpen ? '#1C1C2E' : 'transparent',
            border: '1px solid #1C1C2E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {mobileSidebarOpen ? (
            <X style={{ width: 16, height: 16, color: 'white' }} />
          ) : (
            <>
              <div style={{ width: 16, height: 2, backgroundColor: 'white', borderRadius: 1 }} />
              <div style={{ width: 10, height: 2, backgroundColor: '#0EA5E9', borderRadius: 1 }} />
              <div style={{ width: 16, height: 2, backgroundColor: 'white', borderRadius: 1 }} />
            </>
          )}
        </button>
      )}

      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
        cursor: 'pointer',
      }}
      onClick={() => navigate(isLanding ? '/' : '/dashboard')}
      >
        <div style={{
          width: 32, height: 32,
          borderRadius: '10px',
          backgroundColor: 'rgba(14,165,233,0.15)',
          border: '1px solid rgba(14,165,233,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Brain style={{ width: 18, height: 18, color: '#0EA5E9' }} />
        </div>
        {(!isMobile || isLanding) && (
          <span style={{
            fontWeight: 700,
            fontSize: '18px',
            color: 'white',
            letterSpacing: '-0.02em',
          }}>
            Study<span style={{ color: '#0EA5E9' }}>Hive</span>
          </span>
        )}
      </div>

      {/* Center */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {isLanding && !isMobile ? (
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Features', 'Battle', 'Rooms', 'Pricing'].map(link => (
              <button key={link} style={{
                padding: '7px 14px',
                fontSize: '14px',
                color: '#6B7280',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = 'white'
                ;(e.target as HTMLElement).style.backgroundColor = '#13131F'
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = '#6B7280'
                ;(e.target as HTMLElement).style.backgroundColor = 'transparent'
              }}
              >
                {link}
              </button>
            ))}
          </div>
        ) : pageTitle ? (
          <span style={{
            fontSize: isMobile ? '14px' : '15px',
            color: '#9CA3AF',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {pageTitle}
          </span>
        ) : null}
      </div>

      {/* Right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '6px' : '12px',
        flexShrink: 0,
      }}>
        {/* Search — desktop only */}
        {isDesktop && (
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            backgroundColor: '#13131F',
            border: '1px solid #1C1C2E',
            borderRadius: '8px',
            color: '#6B7280',
            fontSize: '13px',
            cursor: 'pointer',
          }}>
            <Search style={{ width: 13, height: 13 }} />
            <span>Search</span>
            <kbd style={{
              padding: '2px 6px',
              backgroundColor: '#1C1C2E',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'monospace',
            }}>⌘K</kbd>
          </button>
        )}

        {isAuthenticated && (
          <button style={{
            position: 'relative',
            width: 36, height: 36,
            borderRadius: '10px',
            backgroundColor: 'transparent',
            border: '1px solid #1C1C2E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: '#6B7280',
          }}>
            <Bell style={{ width: 16, height: 16 }} />
            {hasUnread && (
              <div style={{
                position: 'absolute',
                top: '6px', right: '6px',
                width: 7, height: 7,
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                border: '1.5px solid #08080C',
              }} />
            )}
          </button>
        )}

        {isAuthenticated && user ? (
          <div style={{ position: 'relative' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div style={{ position: 'relative' }}>
                <Avatar style={{ width: 32, height: 32 }}>
                  <AvatarFallback style={{ backgroundColor: 'rgba(14,165,233,0.2)', color: '#0EA5E9', fontSize: '12px', fontWeight: 700 }}>
                    {user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0,2).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', backgroundColor: '#0EA5E9', color: 'white', fontSize: '8px', fontWeight: 700, padding: '1px 3px', borderRadius: '4px', border: '1px solid #08080C', lineHeight: 1.2 }}>
                  {user.rank || 'S2'}
                </div>
              </div>
              {isDesktop && (
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white', margin: 0, lineHeight: 1.2 }}>
                    {user.name}
                  </p>
                  <p style={{ fontSize: '11px', color: '#0EA5E9', margin: 0, lineHeight: 1.2 }}>
                    {user.examTarget || 'Scholar'}
                  </p>
                </div>
              )}
            </div>

            {showDropdown && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                width: '180px', backgroundColor: '#0F0F18', border: '1px solid #1C1C2E',
                borderRadius: '8px', overflow: 'hidden', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}>
                <button onClick={() => { setShowDropdown(false); navigate('/profile') }} style={{ width: '100%', padding: '10px 16px', textAlign: 'left', background: 'none', border: 'none', color: '#D1D5DB', fontSize: '13px', cursor: 'pointer' }} onMouseEnter={e => (e.target as any).style.backgroundColor = '#1C1C2E'} onMouseLeave={e => (e.target as any).style.backgroundColor = 'transparent'}>My Profile</button>
                <button onClick={() => { setShowDropdown(false); navigate('/settings') }} style={{ width: '100%', padding: '10px 16px', textAlign: 'left', background: 'none', border: 'none', color: '#D1D5DB', fontSize: '13px', cursor: 'pointer' }} onMouseEnter={e => (e.target as any).style.backgroundColor = '#1C1C2E'} onMouseLeave={e => (e.target as any).style.backgroundColor = 'transparent'}>Settings</button>
                <div style={{ height: '1px', backgroundColor: '#1C1C2E' }}></div>
                <button onClick={() => { setShowDropdown(false); handleLogout() }} style={{ width: '100%', padding: '10px 16px', textAlign: 'left', background: 'none', border: 'none', color: '#EF4444', fontSize: '13px', cursor: 'pointer' }} onMouseEnter={e => (e.target as any).style.backgroundColor = '#1C1C2E'} onMouseLeave={e => (e.target as any).style.backgroundColor = 'transparent'}>Sign out</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="ghost" style={{ color: '#9CA3AF' }} onClick={() => navigate('/login')} className="hover:text-white hidden sm:flex">
              Sign in
            </Button>
            <Button size="sm" style={{ backgroundColor: '#0EA5E9', color: 'white' }} onClick={() => navigate('/register')}>
              Get started
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
