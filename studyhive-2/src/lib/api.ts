import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true,
  timeout: 30000,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const originalRequest = error.config
      if (!originalRequest._retry && 
          originalRequest.url !== '/auth/refresh') {
        originalRequest._retry = true
        try {
          const { data } = await api.post('/auth/refresh')
          localStorage.setItem('accessToken', data.accessToken)
          originalRequest.headers.Authorization = 
            `Bearer ${data.accessToken}`
          return api(originalRequest)
        } catch {
          localStorage.removeItem('accessToken')
          console.warn('Session expired - please log in')
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  googleLogin: () => window.location.href = 
    `${import.meta.env.VITE_API_URL}/auth/google`,
}

export const ariaAPI = {
  chat: (message: string, mode: string) => 
    api.post('/api/aria/chat', { message, mode }),
  dailyBrief: () => api.get('/api/aria/daily-brief'),
  knowledgeGraph: () => api.get('/api/aria/knowledge-graph'),
  errorDNA: () => api.get('/api/aria/error-dna'),
  scorePrediction: () => api.get('/api/aria/score-prediction'),
  crashPlan: (data: any) => api.post('/api/aria/crash-plan', data),
  mindMap: (chapter: string, subject: string) => 
    api.post('/api/aria/generate-mindmap', { chapter, subject }),
}

export const battleAPI = {
  matchmake: (data: any) => api.post('/api/battles/matchmake', data),
  create: (data: any) => api.post('/api/battles/create', data),
  join: (battleId: string) => api.post('/api/battles/join', { battleId }),
  get: (id: string) => api.get(`/api/battles/${id}`),
  history: () => api.get('/api/battles/history'),
  leaderboard: (params: any) => api.get('/api/battles/leaderboard', { params }),
  dailyBlitz: () => api.get('/api/questions/daily-blitz'),
  submitBlitz: (answers: any[]) => 
    api.post('/api/questions/daily-blitz/submit', { answers }),
}

export const analyticsAPI = {
  overview: () => api.get('/api/analytics/overview'),
  trend: (period: string) => 
    api.get('/api/analytics/performance-trend', { params: { period } }),
  subjects: () => api.get('/api/analytics/subject-breakdown'),
  weeklyReport: () => api.get('/api/analytics/weekly-report'),
  startSession: (data: any) => api.post('/api/analytics/session/start', data),
  endSession: (id: string, data: any) => 
    api.patch(`/api/analytics/session/${id}/end`, data),
}

export const questionAPI = {
  answer: (data: any) => api.post('/api/questions/answer', data),
  practice: (params: any) => 
    api.get('/api/questions/practice', { params }),
  generate: (data: any) => api.post('/api/questions/generate', data),
}

export const schedulerAPI = {
  today: () => api.get('/api/scheduler/today'),
  generate: (data: any) => api.post('/api/scheduler/generate', data),
  updateSession: (id: string, data: any) => 
    api.patch(`/api/scheduler/session/${id}`, data),
  dueFlashcards: () => api.get('/api/scheduler/flashcards/due'),
  reviewFlashcard: (id: string, rating: number) => 
    api.post('/api/scheduler/flashcards/review', { flashcardId: id, rating }),
}
