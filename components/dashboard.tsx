'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  TrendingUp, 
  BookOpen, 
  AlertCircle,
  ArrowRight,
  Plus
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { sampleKnowledgeCards, weeklyActivity } from '@/lib/sample-data'

interface DashboardProps {
  onNavigateToCards: () => void
  onNavigateToLog: () => void
}

export function Dashboard({ onNavigateToCards, onNavigateToLog }: DashboardProps) {
  const lowConfidenceCards = sampleKnowledgeCards.filter(card => card.confidenceLevel <= 2)
  const recentCards = sampleKnowledgeCards.slice(0, 3)
  const totalMinutesThisWeek = weeklyActivity.reduce((sum, day) => sum + day.minutes, 0)
  const cardsReviewedThisWeek = sampleKnowledgeCards.filter(
    card => new Date(card.lastReviewed) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length

  const categoryColors: Record<string, string> = {
    '不動産': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
    'ビジネス': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    '経済': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    '金融': 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">学習時間</p>
                <p className="text-2xl font-semibold mt-1">{Math.round(totalMinutesThisWeek / 60)}時間 {totalMinutesThisWeek % 60}分</p>
                <p className="text-xs text-muted-foreground mt-1">今週</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">復習したカード</p>
                <p className="text-2xl font-semibold mt-1">{cardsReviewedThisWeek}</p>
                <p className="text-xs text-muted-foreground mt-1">今週</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">習得済み</p>
                <p className="text-2xl font-semibold mt-1">{sampleKnowledgeCards.filter(c => c.reviewStatus === 'mastered').length}</p>
                <p className="text-xs text-muted-foreground mt-1">カード総数</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">要復習</p>
                <p className="text-2xl font-semibold mt-1">{lowConfidenceCards.length}</p>
                <p className="text-xs text-muted-foreground mt-1">理解度が低い</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">週間学習時間</CardTitle>
            <Badge variant="secondary" className="text-xs">分</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                    formatter={(value: number) => [`${value}分`, '学習時間']}
                  />
                  <Bar 
                    dataKey="minutes" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium">クイックアクション</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start gap-2" 
              variant="secondary"
              onClick={onNavigateToCards}
            >
              <Plus className="h-4 w-4" />
              知識カードを追加
            </Button>
            <Button 
              className="w-full justify-start gap-2" 
              variant="secondary"
              onClick={onNavigateToLog}
            >
              <BookOpen className="h-4 w-4" />
              学習ログを記録
            </Button>
            <Button 
              className="w-full justify-start gap-2" 
              variant="secondary"
              onClick={onNavigateToCards}
            >
              <AlertCircle className="h-4 w-4" />
              理解度が低いカードを復習
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cards & Low Confidence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Knowledge Cards */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">最近の知識カード</CardTitle>
            <Button variant="ghost" size="sm" onClick={onNavigateToCards} className="text-xs gap-1">
              すべて表示 <ArrowRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCards.map((card) => (
                <div 
                  key={card.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{card.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{card.summary}</p>
                  </div>
                  <Badge variant="outline" className={categoryColors[card.category]}>
                    {card.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics Needing Review */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">要復習トピック</CardTitle>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              {lowConfidenceCards.length}件
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowConfidenceCards.length > 0 ? (
                lowConfidenceCards.map((card) => (
                  <div 
                    key={card.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{card.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">理解度：</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full ${
                                level <= card.confidenceLevel 
                                  ? 'bg-warning' 
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={categoryColors[card.category]}>
                      {card.category}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  素晴らしい！すぐに復習が必要なトピックはありません。
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
