import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Brain, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/useUserStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const navigate = useNavigate()
  const { login } = useUserStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:3001/auth/google'
  }

  return (
    <div className="min-h-screen bg-[#08080C] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hive-blue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-hive-blue/20 border border-hive-blue/40 flex items-center justify-center mb-3">
          <Brain className="w-6 h-6 text-hive-blue" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Study<span className="text-hive-blue">Hive</span></h1>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-[400px] bg-[#0F0F18] border border-[#1C1C2E] rounded-[20px] p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-1 text-center">Welcome back</h2>
        <p className="text-[#9CA3AF] text-sm text-center mb-6">Sign in to continue your exam prep</p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[rgba(239,68,68,0.1)] border border-red-500/20 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <Button 
          type="button" 
          variant="outline" 
          className="w-full bg-white text-black hover:bg-gray-100 border-0 h-11 relative"
          onClick={handleGoogleAuth}
        >
          <svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#1C1C2E]"></div>
          <span className="px-3 text-xs text-[#6B7280] uppercase tracking-wider font-medium">OR</span>
          <div className="flex-1 h-px bg-[#1C1C2E]"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <Input 
              type="email" 
              placeholder="arjun@gmail.com" 
              className="bg-[#13131F] border-[#1C1C2E] h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-white">Password</label>
              <button type="button" className="text-xs text-[#6B7280] hover:text-white transition-colors">Forgot password?</button>
            </div>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                className="bg-[#13131F] border-[#1C1C2E] h-11 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-hive-blue hover:bg-hive-blue/90 text-white h-11 mt-6"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-hive-blue hover:underline font-medium">Create one</Link>
        </p>
      </div>

      {/* Badges footer */}
      <div className="relative z-10 mt-8 flex flex-col items-center">
        <p className="text-xs text-[#6B7280] mb-3 uppercase tracking-widest font-medium">Trusted by toppers across all exams</p>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full border border-hive-blue/30 bg-hive-blue/10 text-hive-blue text-xs font-medium tracking-wide">JEE</span>
          <span className="px-3 py-1 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] text-xs font-medium tracking-wide">NEET</span>
          <span className="px-3 py-1 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium tracking-wide">UPSC</span>
          <span className="px-3 py-1 rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7] text-xs font-medium tracking-wide">CAT</span>
        </div>
      </div>
    </div>
  )
}
