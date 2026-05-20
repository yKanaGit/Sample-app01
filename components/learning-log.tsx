'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  Calendar,
  BookOpen,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Tag
} from 'lucide-react'
import { sampleLearningLogs } from '@/lib/sample-data'
import { LearningLogEntry, Category } from '@/lib/types'

export function LearningLog() {
  const [isAddingEntry, setIsAddingEntry] = useState(false)
  const [newEntry, setNewEntry] = useState<Partial<LearningLogEntry>>({
    whatILearned: '',
    whatIDontUnderstand: '',
    nextTopicToStudy: '',
    reflection: '',
    categoryTags: []
  })

  const categoryColors: Record<string, string> = {
    '不動産': 'bg-chart-1/20 text-chart-1 border-chart-1/30',
    'ビジネス': 'bg-chart-2/20 text-chart-2 border-chart-2/30',
    '経済': 'bg-chart-3/20 text-chart-3 border-chart-3/30',
    '金融': 'bg-chart-4/20 text-chart-4 border-chart-4/30',
  }

  const categories: Category[] = ['不動産', 'ビジネス', '経済', '金融']

  const toggleCategory = (category: Category) => {
    setNewEntry(prev => ({
      ...prev,
      categoryTags: prev.categoryTags?.includes(category)
        ? prev.categoryTags.filter(c => c !== category)
        : [...(prev.categoryTags || []), category]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Add New Entry Button / Form */}
      {!isAddingEntry ? (
        <Button onClick={() => setIsAddingEntry(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          新しい学習記録
        </Button>
      ) : (
        <Card className="bg-card border-border border-primary/30">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              新しい学習記録
              <Badge variant="outline" className="ml-auto">
                {new Date().toLocaleDateString('ja-JP')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatILearned" className="text-sm text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                今日学んだこと
              </Label>
              <Textarea
                id="whatILearned"
                placeholder="学んだ内容を記述..."
                value={newEntry.whatILearned}
                onChange={(e) => setNewEntry(prev => ({ ...prev, whatILearned: e.target.value }))}
                className="mt-1.5 bg-secondary border-border min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="whatIDontUnderstand" className="text-sm text-muted-foreground flex items-center gap-2">
                <HelpCircle className="h-3.5 w-3.5" />
                まだ理解できていないこと
              </Label>
              <Textarea
                id="whatIDontUnderstand"
                placeholder="理解が不十分な点をメモ..."
                value={newEntry.whatIDontUnderstand}
                onChange={(e) => setNewEntry(prev => ({ ...prev, whatIDontUnderstand: e.target.value }))}
                className="mt-1.5 bg-secondary border-border min-h-20"
              />
            </div>

            <div>
              <Label htmlFor="nextTopicToStudy" className="text-sm text-muted-foreground flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5" />
                次に学ぶトピック
              </Label>
              <Textarea
                id="nextTopicToStudy"
                placeholder="次に何を学ぶ予定ですか？"
                value={newEntry.nextTopicToStudy}
                onChange={(e) => setNewEntry(prev => ({ ...prev, nextTopicToStudy: e.target.value }))}
                className="mt-1.5 bg-secondary border-border min-h-16"
              />
            </div>

            <div>
              <Label htmlFor="reflection" className="text-sm text-muted-foreground flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                振り返り
              </Label>
              <Textarea
                id="reflection"
                placeholder="学習を振り返って..."
                value={newEntry.reflection}
                onChange={(e) => setNewEntry(prev => ({ ...prev, reflection: e.target.value }))}
                className="mt-1.5 bg-secondary border-border min-h-20"
              />
            </div>

            <div>
              <Label className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                <Tag className="h-3.5 w-3.5" />
                カテゴリタグ
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`cursor-pointer transition-colors ${
                      newEntry.categoryTags?.includes(category)
                        ? categoryColors[category]
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="flex-1">記録を保存</Button>
              <Button variant="secondary" onClick={() => setIsAddingEntry(false)}>
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Log Entries */}
      <div className="space-y-4">
        {sampleLearningLogs.map((entry) => (
          <Card key={entry.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{new Date(entry.date).toLocaleDateString('ja-JP', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {entry.categoryTags.map((tag) => (
                    <Badge key={tag} variant="outline" className={categoryColors[tag]}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* What I Learned */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <h4 className="text-sm font-medium">学んだこと</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{entry.whatILearned}</p>
              </div>

              <Separator />

              {/* What I Don't Understand */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="h-3.5 w-3.5 text-warning" />
                  <h4 className="text-sm font-medium">理解が不十分な点</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{entry.whatIDontUnderstand}</p>
              </div>

              {/* Next Topic */}
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRight className="h-3.5 w-3.5 text-chart-2" />
                  <h4 className="text-sm font-medium">次のトピック</h4>
                </div>
                <p className="text-sm text-muted-foreground">{entry.nextTopicToStudy}</p>
              </div>

              {/* Reflection */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-3.5 w-3.5 text-chart-3" />
                  <h4 className="text-sm font-medium">振り返り</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">{entry.reflection}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
