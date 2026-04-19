import { create } from 'zustand'

export interface Toast { id: string; title: string; description?: string; type?: 'default' | 'success' | 'error' | 'warning' }
export interface Notification { id: string; read: boolean; title: string; content: string; createdAt: string }

interface UIState {
  commandPaletteOpen: boolean
  sidebarExpanded: boolean
  mobileSidebarOpen: boolean
  activeToasts: Toast[]
  theme: 'dark' | 'light'
  notifications: Notification[]
  unreadCount: number

  toggleCommandPalette: () => void
  setSidebarExpanded: (expanded: boolean) => void
  setMobileSidebarOpen: (open: boolean) => void
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
  setNotifications: (notifications: Notification[]) => void
  markNotificationRead: (id: string) => void
  incrementUnread: () => void
  resetUnread: () => void
}

export const useUIStore = create<UIState>((set) => ({
  commandPaletteOpen: false,
  sidebarExpanded: true,
  mobileSidebarOpen: false,
  activeToasts: [],
  theme: 'dark',
  notifications: [],
  unreadCount: 0,

  toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
  setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),
  setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),
  addToast: (toast) => set((state) => ({ activeToasts: [...state.activeToasts, toast] })),
  removeToast: (id) => set((state) => ({ activeToasts: state.activeToasts.filter(t => t.id !== id) })),
  setNotifications: (notifications) => set({ notifications }),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  resetUnread: () => set({ unreadCount: 0 })
}))
