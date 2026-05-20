'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { AppHeader } from '@/components/app-header'
import { Dashboard } from '@/components/dashboard'
import { KnowledgeCardsList } from '@/components/knowledge-cards-list'
import { KnowledgeCardDetail } from '@/components/knowledge-card-detail'
import { RealEstateSimulator } from '@/components/real-estate-simulator'
import { LearningLog } from '@/components/learning-log'
import { ConceptMap } from '@/components/concept-map'
import { KnowledgeCard } from '@/lib/types'

type Section = 'dashboard' | 'cards' | 'simulator' | 'log' | 'map'

const sectionTitles: Record<Section, { title: string; subtitle?: string }> = {
  dashboard: { title: 'ダッシュボード', subtitle: '学習の概要' },
  cards: { title: '知識カード', subtitle: '学習カードの閲覧と管理' },
  simulator: { title: '不動産シミュレーター', subtitle: '投資指標の計算' },
  log: { title: '学習ログ', subtitle: '日々の学習記録' },
  map: { title: '概念マップ', subtitle: '概念間の関係を可視化' },
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard')
  const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null)

  const handleSelectCard = (card: KnowledgeCard) => {
    setSelectedCard(card)
  }

  const handleBackToCards = () => {
    setSelectedCard(null)
  }

  const renderContent = () => {
    // Card detail view
    if (activeSection === 'cards' && selectedCard) {
      return <KnowledgeCardDetail card={selectedCard} onBack={handleBackToCards} />
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard 
            onNavigateToCards={() => setActiveSection('cards')}
            onNavigateToLog={() => setActiveSection('log')}
          />
        )
      case 'cards':
        return <KnowledgeCardsList onSelectCard={handleSelectCard} />
      case 'simulator':
        return <RealEstateSimulator />
      case 'log':
        return <LearningLog />
      case 'map':
        return <ConceptMap />
      default:
        return null
    }
  }

  const currentTitle = activeSection === 'cards' && selectedCard 
    ? { title: selectedCard.title, subtitle: selectedCard.category }
    : sectionTitles[activeSection]

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        activeSection={activeSection} 
        onSectionChange={(section) => {
          setActiveSection(section)
          setSelectedCard(null)
        }} 
      />
      <main className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <AppHeader 
            title={currentTitle.title} 
            subtitle={currentTitle.subtitle} 
          />
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
