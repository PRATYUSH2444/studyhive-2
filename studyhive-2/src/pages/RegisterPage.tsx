import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Brain, Zap, FlaskConical, Scale, BarChart2, Loader2, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useUserStore } from '@/store/useUserStore'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [examTarget, setExamTarget] = useState('JEE')
  const [examDate, setExamDate] = useState('')
  const [studyHours, setStudyHours] = useState([4])
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const navigate = useNavigate()
  const { register } = useUserStore()

  // Evaluate password strength: weak, medium, strong
  let pwdStrength = 'weak'
  if (password.length >= 10 && /\d/.test(password) && /[!@#$%^&*()]/.test(password)) {
    pwdStrength = 'strong'
  } else if (password.length >= 6 && /\d/.test(password)) {
    pwdStrength = 'medium'
  } else if (password.length >= 6) {
    pwdStrength = 'weak-valid'
  }

  const getPwdBarColor = () => {
    if (password.length === 0) return 'bg-[#1C1C2E]'
    if (pwdStrength === 'weak') return 'bg-red-500'
    if (pwdStrength === 'weak-valid') return 'bg-red-400'
    if (pwdStrength === 'medium') return 'bg-amber-500'
    return 'bg-green-500'
  }

  const handleNext = () => {
    if (!name || !email || !password || !confirmPassword) return setError('Please fill all fields')
    if (password !== confirmPassword) return setError('Passwords do not match')
    if (password.length < 6) return setError('Password must be at least 6 characters')
    setError(null)
    setStep(2)
  }

  const handleSubmit = async () => {
    if (!examDate) return setError('Please select an exam date')
    setIsLoading(true)
    setError(null)
    try {
      await register(email, password, name, examTarget, examDate)
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hive-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-hive-blue/20 border border-hive-blue/40 flex items-center justify-center mb-3">
          <Brain className="w-6 h-6 text-hive-blue" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Study<span className="text-hive-blue">Hive</span></h1>
      </div>

      <div className="relative z-10 w-full max-w-[480px] bg-[#0F0F18] border border-[#1C1C2E] rounded-[20px] p-8 shadow-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-hive-blue" />
          <div className={`w-8 h-[2px] ${step === 2 ? 'bg-hive-blue' : 'bg-[#1C1C2E]'}`} />
          <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-hive-blue' : 'bg-transparent border border-[#6B7280]'}`} />
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-[rgba(239,68,68,0.1)] border border-red-500/20 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-1 text-center">Create account</h2>
            <p className="text-[#9CA3AF] text-sm text-center mb-6">Start your journey to top percentiles</p>

            <Button type="button" variant="outline" className="w-full bg-white text-black hover:bg-gray-100 border-0 h-11 relative" onClick={handleGoogleAuth}>
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

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Full Name</label>
                <Input placeholder="Arjun Kumar" className="bg-[#13131F] border-[#1C1C2E] h-11" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <Input type="email" placeholder="arjun@example.com" className="bg-[#13131F] border-[#1C1C2E] h-11" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <Input type="password" placeholder="Create a strong password" className="bg-[#13131F] border-[#1C1C2E] h-11" value={password} onChange={e => setPassword(e.target.value)} />
                <div className="flex gap-1 mt-2">
                  <div className={`h-1 flex-1 rounded-full ${password.length > 0 ? getPwdBarColor() : 'bg-[#1C1C2E]'}`} />
                  <div className={`h-1 flex-1 rounded-full ${password.length >= 6 && pwdStrength !== 'weak' ? getPwdBarColor() : 'bg-[#1C1C2E]'}`} />
                  <div className={`h-1 flex-1 rounded-full ${pwdStrength === 'strong' ? getPwdBarColor() : 'bg-[#1C1C2E]'}`} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Confirm Password</label>
                <Input type="password" placeholder="Confirm your password" className="bg-[#13131F] border-[#1C1C2E] h-11" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>

              <Button onClick={handleNext} className="w-full bg-hive-blue hover:bg-hive-blue/90 text-white h-11 mt-6">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-1 text-center">Which exam are you preparing for?</h2>
            <p className="text-[#9CA3AF] text-sm text-center mb-6">We'll tailor your ARIA brain to this syllabus</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'JEE', name: 'JEE Advanced', color: 'hive-blue', students: '12', icon: Zap },
                { id: 'NEET', name: 'NEET UG', color: 'hive-green', students: '24', icon: FlaskConical },
                { id: 'UPSC', name: 'UPSC CSE', color: 'hive-gold', students: '11', icon: Scale },
                { id: 'CAT', name: 'CAT', color: 'hive-purple', students: '3', icon: BarChart2 },
              ].map(ex => {
                const isSel = examTarget === ex.id
                return (
                  <div key={ex.id} 
                    onClick={() => setExamTarget(ex.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSel ? `border-${ex.color} bg-${ex.color}/10` : 'border-[#1C1C2E] bg-[#13131F] hover:border-[#6B7280]'
                    }`}>
                    <ex.icon className={`w-6 h-6 mb-2 ${isSel ? `text-${ex.color}` : 'text-hive-muted'}`} />
                    <p className="font-semibold text-white text-sm">{ex.name}</p>
                    <p className="text-xs text-hive-muted">{ex.students} lakh aspirants</p>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-white">When is your exam?</label>
              <Input type="date" className="bg-[#13131F] border-[#1C1C2E] h-11 dark" value={examDate} onChange={e => setExamDate(e.target.value)} />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white">How many hours can you study daily?</label>
                <span className="text-hive-blue font-semibold text-sm">{studyHours[0]} hours/day</span>
              </div>
              <Slider min={1} max={12} step={0.5} value={studyHours} onValueChange={setStudyHours} className="py-2" />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 bg-transparent border-[#1C1C2E] text-white hover:bg-[#1C1C2E]">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading} className="flex-[2] bg-hive-blue hover:bg-hive-blue/90 text-white">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-hive-blue hover:underline font-medium">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  )
}
