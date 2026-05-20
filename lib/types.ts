export type Category = '不動産' | 'ビジネス' | '経済' | '金融'

export interface KnowledgeCard {
  id: string
  title: string
  category: Category
  summary: string
  explanation: string
  myUnderstanding: string
  relatedTerms: string[]
  relatedConcepts: string[]
  examples: string[]
  notes: string
  confidenceLevel: 1 | 2 | 3 | 4 | 5
  lastReviewed: string
  reviewStatus: 'new' | 'learning' | 'reviewing' | 'mastered'
}

export interface LearningLogEntry {
  id: string
  date: string
  whatILearned: string
  whatIDontUnderstand: string
  nextTopicToStudy: string
  reflection: string
  categoryTags: Category[]
}

export interface ConceptNode {
  id: string
  label: string
  category: Category
  x: number
  y: number
}

export interface ConceptEdge {
  from: string
  to: string
  relationship: string
}

export interface SimulatorInputs {
  propertyPrice: number
  monthlyRent: number
  vacancyRate: number
  operatingExpenses: number
  propertyTax: number
  loanAmount: number
  interestRate: number
  loanTermYears: number
}

export interface SimulatorOutputs {
  grossYield: number
  netYield: number
  noi: number
  monthlyLoanPayment: number
  monthlyCashFlow: number
  annualCashFlow: number
}

export interface WeeklyActivity {
  day: string
  minutes: number
}
