import React, { useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, fetchMe } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchMe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08080C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-hive-blue/20 border border-hive-blue/40 flex items-center justify-center animate-pulse">
            <Brain className="w-6 h-6 text-hive-blue animate-bounce" />
          </div>
          <p className="text-hive-muted text-sm">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
