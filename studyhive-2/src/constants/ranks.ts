export const RANKS = [
  { name: 'Apprentice', minXP: 0,     maxXP: 499,   color: '#6B7280' },
  { name: 'Scholar',    minXP: 500,   maxXP: 1499,  color: '#0EA5E9' },
  { name: 'Thinker',    minXP: 1500,  maxXP: 3499,  color: '#8B5CF6' },
  { name: 'Innovator',  minXP: 3500,  maxXP: 6999,  color: '#F59E0B' },
  { name: 'Architect',  minXP: 7000,  maxXP: 11999, color: '#EC4899' },
  { name: 'Genius',     minXP: 12000, maxXP: 19999, color: '#EF4444' },
  { name: 'Einstein',   minXP: 20000, maxXP: Infinity, color: '#FFD700' },
] as const

export const getRankByXP = (xp: number) => {
  return RANKS.find(r => xp >= r.minXP && xp <= r.maxXP) || RANKS[0]
}

export const getNextRank = (xp: number) => {
  const currentIndex = RANKS.findIndex(
    r => xp >= r.minXP && xp <= r.maxXP
  )
  return RANKS[currentIndex + 1] || null
}

export const getXPProgress = (xp: number) => {
  const current = getRankByXP(xp)
  const range = current.maxXP - current.minXP
  const progress = xp - current.minXP
  return Math.round((progress / range) * 100)
}
