import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface UserState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, examTarget: string, examDate?: string) => Promise<void>
  logout: () => Promise<void>
  fetchMe: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
            }
          )
          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || 'Login failed')
          }
          localStorage.setItem('accessToken', data.accessToken)
          set({ 
            user: data.user, 
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message,
            isAuthenticated: false,
          })
          throw error
        }
      },

      register: async (email, password, name, examTarget, examDate?) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/register`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ 
                email, password, name, examTarget, examDate 
              }),
            }
          )
          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || 'Registration failed')
          }
          localStorage.setItem('accessToken', data.accessToken)
          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message,
            isAuthenticated: false,
          })
          throw error
        }
      },

      logout: async () => {
        try {
          await fetch(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/logout`,
            { method: 'POST', credentials: 'include' }
          )
        } catch {}
        localStorage.removeItem('accessToken')
        set({ 
          user: null, 
          accessToken: null, 
          isAuthenticated: false 
        })
      },

      fetchMe: async () => {
        const token = localStorage.getItem('accessToken') || get().accessToken
        if (!token) {
          set({ isAuthenticated: false, isLoading: false })
          return
        }
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
              credentials: 'include',
            }
          )
          if (!response.ok) throw new Error('Unauthorized')
          const data = await response.json()
          set({
            user: data.user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          localStorage.removeItem('accessToken')
          set({ 
            user: null, 
            accessToken: null, 
            isAuthenticated: false,
            isLoading: false,
          })
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    }
  )
)
