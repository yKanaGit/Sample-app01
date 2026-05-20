'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Plus,
  ChevronRight
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sampleKnowledgeCards } from '@/lib/sample-data'
import { KnowledgeCard, Category } from '@/lib/types'

interface KnowledgeCardsListProps {
  onSelectCard: (card: KnowledgeCard) => void
}

const statusLabels: Record<string, string> = {
  'new': '新規',
  'learning': '学習中',
  'reviewing': '復習中',
  'mastered': '習得済み',
}

export function KnowledgeCardsList({ onSelectCard }: KnowledgeCardsListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all')

  const categoryColors: Record<string, string> = {
    '不動産': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
    'ビジネス': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    '経済': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    '金融': 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  }

  const statusColors: Record<string, string> = {
    'new': 'bg-info/20 text-info border-info/30',
    'learning': 'bg-warning/20 text-warning border-warning/30',
    'reviewing': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    'mastered': 'bg-success/20 text-success border-success/30',
  }

  const filteredCards = sampleKnowledgeCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.relatedTerms.some(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = categoryFilter === 'all' || card.category === categoryFilter
    const matchesConfidence = confidenceFilter === 'all' || card.confidenceLevel === parseInt(confidenceFilter)

    return matchesSearch && matchesCategory && matchesConfidence
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="カード、用語、トピックを検索..." 
                className="pl-9 bg-secondary border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40 bg-secondary border-border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="カテゴリ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべてのカテゴリ</SelectItem>
                  <SelectItem value="不動産">不動産</SelectItem>
                  <SelectItem value="ビジネス">ビジネス</SelectItem>
                  <SelectItem value="経済">経済</SelectItem>
                  <SelectItem value="金融">金融</SelectItem>
                </SelectContent>
              </Select>
              <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                <SelectTrigger className="w-40 bg-secondary border-border">
                  <SelectValue placeholder="理解度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべてのレベル</SelectItem>
                  <SelectItem value="1">レベル 1</SelectItem>
                  <SelectItem value="2">レベル 2</SelectItem>
                  <SelectItem value="3">レベル 3</SelectItem>
                  <SelectItem value="4">レベル 4</SelectItem>
                  <SelectItem value="5">レベル 5</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">カードを追加</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {sampleKnowledgeCards.length}件中 {filteredCards.length}件を表示
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCards.map((card) => (
          <Card 
            key={card.id} 
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => onSelectCard(card)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base font-medium line-clamp-1">{card.title}</CardTitle>
                <Badge variant="outline" className={categoryColors[card.category]}>
                  {card.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{card.summary}</p>
              
              {/* Related Terms */}
              <div className="flex flex-wrap gap-1.5">
                {card.relatedTerms.slice(0, 3).map((term, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-normal">
                    {term}
                  </Badge>
                ))}
                {card.relatedTerms.length > 3 && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    +{card.relatedTerms.length - 3}
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-3">
                  {/* Confidence */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">理解度：</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-1.5 h-1.5 rounded-full ${
                            level <= card.confidenceLevel 
                              ? 'bg-primary' 
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs ${statusColors[card.reviewStatus]}`}>
                  {statusLabels[card.reviewStatus]}
                </Badge>
              </div>

              {/* Last Reviewed */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  最終復習日：{new Date(card.lastReviewed).toLocaleDateString('ja-JP')}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">条件に一致するカードが見つかりませんでした。</p>
            <Button variant="link" onClick={() => {
              setSearchQuery('')
              setCategoryFilter('all')
              setConfidenceFilter('all')
            }}>
              フィルターをクリア
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
