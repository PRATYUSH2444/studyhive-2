import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import type { ARIAMessage } from '@/types/aria'
import { Brain, Mic, ImagePlus, Send, AlertTriangle, Clock } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useUserStore } from '@/store/useUserStore'
import { useAnalyticsOverview } from '@/hooks/useAnalytics'
import { useErrorDNA } from '@/hooks/useARIAData'
import { ChatSkeleton } from '@/components/ui/LoadingSkeleton'

interface ARIAChatProps {
  initialMode?: 'strict' | 'supportive' | 'socratic' | 'strategist'
}

export default function ARIAChat({ initialMode = 'socratic' }: ARIAChatProps) {
  const [activeMode, setActiveMode] = useState(initialMode)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ARIAMessage[]>([
    { id: '1', role: 'aria', content: "Hi! I'm ARIA. Ask me anything to get started.", timestamp: new Date(), mode: initialMode }
  ])

  const { isMobile } = useBreakpoint()
  const { user } = useUserStore()
  const { data: analytics, isLoading: analyticsLoading } = useAnalyticsOverview()
  const { data: dnaData } = useErrorDNA()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingDotsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  // Mode switch animation
  const handleModeChange = (mode: 'strict' | 'supportive' | 'socratic' | 'strategist') => {
    setActiveMode(mode)
    gsap.from('.mode-indicator', {
      scale: 0.8, opacity: 0, duration: 0.3, ease: 'back.out(2)'
    })
  }

  // Input field focus glow
  const handleInputFocus = () => {
    gsap.to(inputRef.current, {
      boxShadow: '0 0 0 2px rgba(14,165,233,0.4)',
      duration: 0.3,
    })
  }
  const handleInputBlur = () => {
    gsap.to(inputRef.current, {
      boxShadow: '0 0 0 0px rgba(14,165,233,0)',
      duration: 0.3,
    })
  }

  // Typing dots animation
  useGSAP(() => {
    if (isTyping && typingDotsRef.current) {
      const dots = typingDotsRef.current.querySelectorAll('.typing-dot')
      gsap.to(dots, {
        scaleY: 1.6,
        duration: 0.35,
        ease: 'sine.inOut',
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
      })
    }
  }, { dependencies: [isTyping] })

  // Animate new messages
  useEffect(() => {
    const allMessages = document.querySelectorAll('.message-bubble')
    const latest = allMessages[allMessages.length - 1]
    if (latest) {
      gsap.fromTo(latest,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, 
          duration: 0.4, ease: 'back.out(1.5)' 
        }
      )
    }
    // Auto scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([])
  const isLoading = isTyping

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return
    
    const messageText = inputValue.trim()
    setInputValue('')
    
    const userMessage: ARIAMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
      mode: activeMode,
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    
    try {
      const token = localStorage.getItem('accessToken') || 
        sessionStorage.getItem('accessToken')
      
      if (!token) {
        const ariaMsg: ARIAMessage = {
          id: (Date.now()+1).toString(),
          role: 'aria',
          content: 'Please log in to chat with ARIA. ' +
            'Your session has expired.',
          timestamp: new Date(),
          mode: activeMode,
        }
        setMessages(prev => [...prev, ariaMsg])
        setIsTyping(false)
        return
      }
      
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 
          'http://localhost:3001'}/api/aria/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: messageText,
            mode: activeMode,
          }),
        }
      )
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `HTTP ${res.status}`)
      }
      
      const data = await res.json()
      
      const ariaMessage: ARIAMessage = {
        id: (Date.now()+1).toString(),
        role: 'aria',
        content: data.response || 
          'I had trouble responding. Please try again.',
        timestamp: new Date(),
        mode: activeMode,
      }
      setMessages(prev => [...prev, ariaMessage])
      
      if (data.suggestedFollowUps?.length > 0) {
        setSuggestedFollowUps(data.suggestedFollowUps)
      }
      
    } catch (error: any) {
      console.error('ARIA chat error:', error)
      const errMsg: ARIAMessage = {
        id: (Date.now()+1).toString(),
        role: 'aria',
        content: `Connection issue: ${error.message}. ` +
          'Make sure backend is running on port 3001.',
        timestamp: new Date(),
        mode: activeMode,
      }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#08080C',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: isMobile ? 'none' : '1px solid #1C1C2E',
        borderBottom: isMobile ? '1px solid #1C1C2E' : 'none',
        minWidth: 0,
        overflow: 'hidden',
        minHeight: isMobile ? '60vh' : 'auto',
      }}>
        <div className="p-4 border-b border-hive-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-hive-blue/20 border border-hive-blue/40 animate-pulse-glow flex items-center justify-center">
            <Brain className="w-4 h-4 text-hive-blue" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">ARIA Coach</p>
            <p className="text-xs text-hive-muted">Powered by Claude · {activeMode} mode</p>
          </div>
          <Badge className="mode-indicator ml-auto bg-hive-surface border-hive-border text-hive-blue hidden sm:inline-flex capitalize">{activeMode}</Badge>
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble flex gap-3 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'aria' ? (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-hive-blue/20 border border-hive-blue/30 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-hive-blue" />
                </div>
              ) : (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-hive-purple/20 text-xs text-hive-purple border border-hive-purple/30">ME</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 flex flex-col" style={{ alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div className={`p-4 ${
                  msg.role === 'aria' 
                    ? 'bg-hive-surface border-l-2 border-hive-blue rounded-r-2xl rounded-bl-2xl' 
                    : 'bg-[#151520] border border-hive-border rounded-l-2xl rounded-br-2xl max-w-[85%]'
                }`}>
                  <p className="text-sm text-white leading-relaxed">{msg.content}</p>
                </div>
                <p className={`text-[10px] text-hive-muted mt-1 ${msg.role === 'user' ? 'mr-1' : 'ml-1'}`}>{formatTime(msg.timestamp)}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div data-gsap="typing-dots" ref={typingDotsRef} className="flex gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-hive-blue/20 border border-hive-blue/30 flex items-center justify-center">
                <Brain className="w-4 h-4 text-hive-blue" />
              </div>
              <div className="bg-hive-surface border-l-2 border-hive-blue rounded-r-2xl rounded-bl-2xl p-4 flex gap-1 items-center h-[52px]">
                <div className="typing-dot w-2 h-2 rounded-full bg-hive-blue/60" />
                <div className="typing-dot w-2 h-2 rounded-full bg-hive-blue/60" />
                <div className="typing-dot w-2 h-2 rounded-full bg-hive-blue/60" />
              </div>
            </div>
          )}
          {suggestedFollowUps.length > 0 && !isTyping && (
            <div style={{ padding: '8px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {suggestedFollowUps.map(followUp => (
                <button
                  key={followUp}
                  onClick={() => {
                    setInputValue(followUp)
                    // Optionally we can auto send it here, but letting user hit send is also fine.
                  }}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(14,165,233,0.08)',
                    border: '1px solid rgba(14,165,233,0.2)',
                    borderRadius: '20px',
                    color: '#0EA5E9',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {followUp}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t border-hive-border bg-hive-card">
          <div className="flex gap-2">
            <Input 
              ref={inputRef}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Ask ARIA anything... try voice or image too" 
              className="flex-1 bg-hive-surface border-hive-border text-white placeholder:text-hive-muted focus-visible:ring-hive-blue focus-visible:ring-offset-0 focus-visible:border-hive-blue"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <Button variant="ghost" size="icon" className="text-hive-muted hover:text-hive-blue hover:bg-hive-surface hidden sm:inline-flex">
              <Mic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-hive-muted hover:text-hive-blue hover:bg-hive-surface">
              <ImagePlus className="w-4 h-4" />
            </Button>
            <Button size="icon" className="bg-hive-blue hover:bg-hive-blue/90 text-white shadow-hive-blue" onClick={handleSend}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div style={{
        width: isMobile ? '100%' : '320px',
        flexShrink: 0,
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px 16px',
        backgroundColor: '#0F0F18',
        overflowY: 'auto',
      }}>
        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider font-medium mb-4">Your Stats</p>
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-hive-border">
            <div><p className="text-lg font-bold text-hive-blue">{analytics?.accuracy || 0}%</p><p className="text-[10px] text-hive-muted">Accuracy</p></div>
            <div><p className="text-lg font-bold text-hive-blue">{user?.streak || 0}d</p><p className="text-[10px] text-hive-muted">Streak</p></div>
            <div>
              <p className="text-lg font-bold text-hive-blue">
                {user?.examDate ? Math.max(0, Math.ceil((new Date(user.examDate).getTime() - Date.now()) / 86400000)) : 47}
              </p>
              <p className="text-[10px] text-hive-muted">Days left</p>
            </div>
          </div>
        </div>

        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider font-medium flex items-center gap-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-hive-red" /> Danger Zones
          </p>
          <div className="flex flex-wrap gap-2">
            {dnaData?.patterns?.length ? (
              dnaData.patterns.map((ep: any) => (
                <Badge key={ep.name} variant="destructive" className="bg-hive-red/10 text-hive-red hover:bg-hive-red/20 font-normal border-hive-red/20">{ep.subject}</Badge>
              ))
            ) : (
              <p className="text-[10px] text-hive-muted">No danger zones identified yet.</p>
            )}
          </div>
        </div>

        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider font-medium flex items-center gap-2 mb-2">
            <Clock className="w-3.5 h-3.5 text-hive-green" /> Peak Window
          </p>
          <p className="text-sm font-semibold text-hive-green">09:00 AM — 11:30 AM</p>
          <p className="text-[10px] text-hive-muted mt-1 leading-tight">Your best cognitive performance window based on circadian analysis.</p>
        </div>

        <div className="hive-card p-4">
          <p className="text-xs text-hive-muted uppercase tracking-wider font-medium mb-3">ARIA Mode</p>
          <div className="grid grid-cols-2 gap-2">
            {(['strict', 'supportive', 'socratic', 'strategist'] as const).map(mode => {
              const isAct = activeMode === mode
              return (
                <Button key={mode} variant="outline" size="sm" onClick={() => handleModeChange(mode)}
                  className={`h-8 text-xs font-medium capitalize transition-all border ${isAct ? 'border-hive-blue bg-hive-blue/10 text-hive-blue hover:bg-hive-blue/20 hover:text-hive-blue' : 'border-hive-border text-hive-muted hover:text-white hover:bg-hive-surface'}`}>
                  {mode}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
