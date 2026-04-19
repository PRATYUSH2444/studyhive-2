import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { LayoutDashboard, Swords, Brain, BarChart2, Users, BookOpen, FileText, Calendar, Zap, Target, Volume2, AlertTriangle, Sparkles, TrendingDown, TrendingUp, Search, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    
    if (open) {
      requestAnimationFrame(() => {
        const dialog = document.querySelector('[role="dialog"]')
        if (dialog) {
          gsap.fromTo(dialog,
            { scale: 0.93, opacity: 0, y: -16 },
            { 
              scale: 1, opacity: 1, y: 0,
              duration: 0.3, ease: 'back.out(2.5)'
            }
          )
        }
      })
    }
    
    return () => document.removeEventListener('keydown', down)
  }, [open])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." className="text-white bg-hive-card border-b-hive-border" />
      <CommandList className="bg-[#0b0b12] text-hive-muted">
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigate" className="text-hive-muted">
          <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))} className="hover:bg-hive-surface text-white aria-selected:bg-hive-surface"><LayoutDashboard className="mr-2 h-4 w-4" />Mission Control</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/battle'))} className="hover:bg-hive-surface text-white aria-selected:bg-hive-surface"><Swords className="mr-2 h-4 w-4" />Battle Arena</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/coach'))} className="hover:bg-hive-surface text-white aria-selected:bg-hive-surface"><Brain className="mr-2 h-4 w-4" />ARIA Coach</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/analytics'))} className="hover:bg-hive-surface text-white aria-selected:bg-hive-surface"><BarChart2 className="mr-2 h-4 w-4" />Analytics</CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="bg-hive-border" />
        
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => navigate('/battle?mode=1v1'))} className="text-white aria-selected:bg-hive-surface"><Zap className="mr-2 h-4 w-4 text-hive-gold" />Start 1v1 Battle</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/forge'))} className="text-white aria-selected:bg-hive-surface"><FileText className="mr-2 h-4 w-4 text-hive-blue" />Generate Mock Test</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/coach?mode=sos'))} className="text-hive-red aria-selected:bg-hive-red/10 aria-selected:text-hive-red"><AlertTriangle className="mr-2 h-4 w-4" />Emergency SOS 🚨</CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-hive-border" />

        <CommandGroup heading="ARIA Commands">
          <CommandItem onSelect={() => runCommand(() => navigate('/coach?q=crash-plan'))} className="text-white aria-selected:bg-hive-surface"><Sparkles className="mr-2 h-4 w-4 text-hive-purple" />Build my 3-day crash plan</CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate('/analytics'))} className="text-white aria-selected:bg-hive-surface"><TrendingDown className="mr-2 h-4 w-4 text-hive-red" />Show my weakest topics</CommandItem>
        </CommandGroup>
      </CommandList>
      
      <div className="border-t border-hive-border bg-hive-card px-4 py-3 flex flex-wrap items-center gap-3 md:gap-4 text-xs text-hive-muted rounded-b-lg">
        <div className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-hive-gold" /> <span className="text-white font-medium">23 day streak</span></div>
        <div className="w-1 h-1 rounded-full bg-hive-border" />
        <div className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-hive-blue" /> <span className="text-white font-medium">47 days to JEE</span></div>
        <div className="w-1 h-1 rounded-full bg-hive-border" />
        <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-hive-green" /> <span className="text-white font-medium">91.2%ile projected</span></div>
        <span className="ml-auto text-[10px] border border-hive-border px-1.5 py-0.5 rounded">ESC to close</span>
      </div>
    </CommandDialog>
  )
}
export default CommandPalette;
