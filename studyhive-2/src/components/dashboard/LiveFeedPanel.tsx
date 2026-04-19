import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Swords, Trophy, TrendingUp } from 'lucide-react'

interface FeedItem {
  id: string
  type: 'battle' | 'doubt' | 'milestone' | 'alert'
  user: string
  action: string
  subject?: string
  time: string
  points?: number
}

interface LiveFeedPanelProps {
  items: FeedItem[]
}

export default function LiveFeedPanel({ items }: LiveFeedPanelProps) {
  return (
    <div className="hive-card flex flex-col overflow-hidden">
      <div className="p-4 border-b border-hive-border flex items-center justify-between bg-hive-card z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-hive-green animate-pulse" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Live Hive Feed</h2>
        </div>
        <Badge variant="outline" className="text-[10px] text-hive-green border-hive-green/30 bg-hive-green/10">LIVE</Badge>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="px-4 pt-3">
          <TabsList className="w-full bg-hive-surface border border-hive-border">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-hive-card data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="battles" className="flex-1 data-[state=active]:bg-hive-card data-[state=active]:text-white">Battles</TabsTrigger>
            <TabsTrigger value="doubts" className="flex-1 data-[state=active]:bg-hive-card data-[state=active]:text-white">Doubts</TabsTrigger>
            <TabsTrigger value="milestones" className="flex-1 data-[state=active]:bg-hive-card data-[state=active]:text-white">Milestones</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 mt-0 outline-none h-[400px]">
          <ScrollArea className="h-full">
            <div className="p-4 flex flex-col">
              {items.map((item) => (
                <div key={item.id} className="feed-item flex flex-row gap-3 py-4 border-b border-hive-border last:border-0 hover:bg-hive-surface/30 px-2 rounded-xl transition-colors">
                  <Avatar className="w-10 h-10 border border-hive-border">
                    <AvatarFallback className="bg-hive-surface text-hive-muted text-xs">
                      {item.user.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-white"><span className="font-semibold">{item.user}</span> {item.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.subject && <Badge variant="outline" className="text-[10px] border-hive-border text-hive-muted py-0 h-4">{item.subject}</Badge>}
                      <span className="text-xs text-hive-muted">{item.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    {item.points && <Badge className="bg-hive-green/20 text-hive-green border-0 text-xs mb-1">+{item.points} pts</Badge>}
                    {item.type === 'battle' && <Swords className="w-4 h-4 text-hive-blue" />}
                    {item.type === 'milestone' && <Trophy className="w-4 h-4 text-hive-gold" />}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-hive-surface/50 border-t border-hive-border mt-auto">
              <p className="text-xs font-semibold text-white mb-3">Trending Doubts</p>
              <div className="flex flex-wrap gap-2">
                {['Electrochemistry', 'Optics — Lens Formula', 'Integration by Parts'].map(topic => (
                  <Badge key={topic} variant="outline" className="bg-hive-surface hover:bg-hive-card cursor-pointer border-hive-border text-hive-muted text-xs flex gap-1 group">
                    <TrendingUp className="w-3 h-3 text-hive-purple group-hover:text-hive-blue transition-colors" /> {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
