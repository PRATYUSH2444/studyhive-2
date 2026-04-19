import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import AppShell from '@/components/layout/AppShell'

const Landing = lazy(() => import('@/pages/Landing'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const BattleArenaPage = lazy(() => import('@/pages/BattleArenaPage'))
const AICoachPage = lazy(() => import('@/pages/AICoachPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const HiveRoomsPage = lazy(() => import('@/pages/HiveRoomsPage'))
const DeepStudyPage = lazy(() => import('@/pages/DeepStudyPage'))
const ExamForgePage = lazy(() => import('@/pages/ExamForgePage'))
const SchedulePage = lazy(() => import('@/pages/SchedulePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const OAuthCallback = lazy(() => import('@/pages/OAuthCallback'))
import AuthGuard from '@/components/layout/AuthGuard'
import { useUserStore } from '@/store/useUserStore'
import { Navigate } from 'react-router-dom'

function PageLoader() {
  return (
    <div className="min-h-screen bg-hive-dark flex items-center 
      justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-hive-blue/20 
          border border-hive-blue/40 flex items-center justify-center
          animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 
            border-hive-blue border-t-transparent animate-spin" />
        </div>
        <p className="text-hive-muted text-sm">Loading StudyHive...</p>
      </div>
    </div>
  )
}

export default function App() {
  const { isAuthenticated } = useUserStore()
  
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="/dashboard" element={
          <AuthGuard><AppShell><Dashboard /></AppShell></AuthGuard>
        } />
        <Route path="/battle" element={
          <AuthGuard><AppShell><BattleArenaPage /></AppShell></AuthGuard>
        } />
        <Route path="/coach" element={
          <AuthGuard><AppShell><AICoachPage /></AppShell></AuthGuard>
        } />
        <Route path="/analytics" element={
          <AuthGuard><AppShell><AnalyticsPage /></AppShell></AuthGuard>
        } />
        <Route path="/rooms" element={
          <AuthGuard><AppShell><HiveRoomsPage /></AppShell></AuthGuard>
        } />
        <Route path="/study" element={
          <AuthGuard><AppShell><DeepStudyPage /></AppShell></AuthGuard>
        } />
        <Route path="/forge" element={
          <AuthGuard><AppShell><ExamForgePage /></AppShell></AuthGuard>
        } />
        <Route path="/schedule" element={
          <AuthGuard><AppShell><SchedulePage /></AppShell></AuthGuard>
        } />
        <Route path="*" element={
          <div className="min-h-screen bg-hive-dark flex items-center 
            justify-center flex-col gap-4">
            <p className="text-6xl font-bold text-white">404</p>
            <p className="text-hive-muted">Page not found</p>
            <a href="/" className="text-hive-blue hover:underline">
              Go home
            </a>
          </div>
        } />
      </Routes>
    </Suspense>
  )
}
