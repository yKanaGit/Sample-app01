'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Edit, 
  Calendar,
  BookOpen,
  Lightbulb,
  Link2,
  StickyNote
} from 'lucide-react'
import { KnowledgeCard } from '@/lib/types'

interface KnowledgeCardDetailProps {
  card: KnowledgeCard
  onBack: () => void
}

const statusLabels: Record<string, string> = {
  'new': '新規',
  'learning': '学習中',
  'reviewing': '復習中',
  'mastered': '習得済み',
}

export function KnowledgeCardDetail({ card, onBack }: KnowledgeCardDetailProps) {
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

  return (
    <div className="space-y-6">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          カード一覧に戻る
        </Button>
        <Button className="gap-2">
          <Edit className="h-4 w-4" />
          カードを編集
        </Button>
      </div>

      {/* Main Card */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold">{card.title}</CardTitle>
              <p className="text-muted-foreground mt-2">{card.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={categoryColors[card.category]}>
                {card.category}
              </Badge>
              <Badge variant="outline" className={statusColors[card.reviewStatus]}>
                {statusLabels[card.reviewStatus]}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              最終復習日：{new Date(card.lastReviewed).toLocaleDateString('ja-JP')}
            </div>
            <div className="flex items-center gap-2">
              <span>理解度：</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full ${
                      level <= card.confidenceLevel 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <span>({card.confidenceLevel}/5)</span>
            </div>
          </div>

          <Separator />

          {/* Explanation */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="font-medium">解説</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{card.explanation}</p>
          </div>

          {/* My Understanding */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-warning" />
              <h3 className="font-medium">自分の理解</h3>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-muted-foreground leading-relaxed">{card.myUnderstanding}</p>
            </div>
          </div>

          {/* Related Concepts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Link2 className="h-4 w-4 text-chart-2" />
              <h3 className="font-medium">関連概念</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {card.relatedConcepts.map((concept, idx) => (
                <Badge key={idx} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Terms */}
          <div>
            <h3 className="font-medium mb-3">関連用語</h3>
            <div className="flex flex-wrap gap-2">
              {card.relatedTerms.map((term, idx) => (
                <Badge key={idx} variant="outline">
                  {term}
                </Badge>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div>
            <h3 className="font-medium mb-3">具体例</h3>
            <ul className="space-y-2">
              {card.examples.map((example, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {card.notes && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <StickyNote className="h-4 w-4 text-chart-4" />
                <h3 className="font-medium">メモ</h3>
              </div>
              <div className="bg-chart-4/5 border border-chart-4/20 rounded-lg p-4">
                <p className="text-muted-foreground">{card.notes}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" className="flex-1 sm:flex-none">
          復習済みにする
        </Button>
        <Button variant="secondary" className="flex-1 sm:flex-none">
          理解度を上げる
        </Button>
        <Button variant="secondary" className="flex-1 sm:flex-none">
          学習セッションに追加
        </Button>
      </div>
    </div>
  )
}
