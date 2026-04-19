import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

export default function OAuthCallback() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const error = params.get('error')
    
    if (error) {
      navigate('/login?error=' + encodeURIComponent(error))
      return
    }
    
    if (token) {
      localStorage.setItem('accessToken', token)
      useUserStore.getState().fetchMe().then(() => {
        navigate('/dashboard')
      })
    } else {
      navigate('/login')
    }
  }, [navigate])
  
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
