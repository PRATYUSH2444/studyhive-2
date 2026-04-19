import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import CommandPalette from './CommandPalette'
import useBreakpoint from '@/hooks/useBreakpoint'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    if (isDesktop) setMobileSidebarOpen(false)
  }, [isDesktop])

  const sidebarWidth = isMobile ? 0 
    : sidebarExpanded ? 240 
    : 64

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#08080C',
      overflowX: 'hidden',
    }}>
      <Navbar
        onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobile={isMobile}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      {/* Mobile sidebar overlay */}
      {isMobile && mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 45,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      <div style={{ 
        display: 'flex',
        paddingTop: '64px',
        minHeight: 'calc(100vh - 64px)',
      }}>
        <Sidebar
          expanded={isMobile ? mobileSidebarOpen : sidebarExpanded}
          onToggle={() => {
            if (isMobile) setMobileSidebarOpen(false)
            else setSidebarExpanded(!sidebarExpanded)
          }}
          isMobile={isMobile}
          mobileSidebarOpen={mobileSidebarOpen}
        />

        <main style={{
          flex: 1,
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          marginLeft: isMobile ? '0' : `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease',
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
