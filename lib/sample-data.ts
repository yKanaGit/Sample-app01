import { KnowledgeCard, LearningLogEntry, ConceptNode, ConceptEdge, WeeklyActivity } from './types'

export const sampleKnowledgeCards: KnowledgeCard[] = [
  {
    id: '1',
    title: 'キャップレート',
    category: '不動産',
    summary: '純営業収益（NOI）÷ 物件価格',
    explanation: 'キャップレート（還元利回り）は、不動産投資の比較に使用される評価指標です。純営業収益（NOI）を物件の現在の市場価値または購入価格で割って算出します。',
    myUnderstanding: '全額現金で物件を購入した場合のリターンと考える。キャップレートが高い＝リスクは高いが、リターンも高い可能性がある。',
    relatedTerms: ['NOI', '利回り', 'ROI', '不動産評価'],
    relatedConcepts: ['純営業収益', '物件価格', 'リスク評価'],
    examples: ['NOI 1,000万円、物件価格 1億円の場合、キャップレートは10%', 'クラスA物件は通常キャップレートが低く（4〜6%）、クラスC物件は高い（8〜12%）'],
    notes: 'キャップレートは市場や物件タイプによって大きく異なる。都市部は一般的にキャップレートが低い傾向がある。',
    confidenceLevel: 4,
    lastReviewed: '2024-01-15',
    reviewStatus: 'reviewing'
  },
  {
    id: '2',
    title: '純営業収益（NOI）',
    category: '不動産',
    summary: '総収入 − 運営費',
    explanation: 'NOIは、収益を生み出す不動産投資を分析するために使用される計算式です。物件からの全収入から、合理的に必要なすべての運営費を差し引いた金額です。',
    myUnderstanding: '賃料などの収入から運営コスト（ローン返済は含まない）を引いたもの。物件評価の重要な指標。',
    relatedTerms: ['総収入', '運営費', 'キャップレート'],
    relatedConcepts: ['収益', '経費', '物件管理'],
    examples: ['賃料収入 1,200万円 − 運営費 400万円 = NOI 800万円'],
    notes: 'ローン返済、資本的支出、減価償却は含まない。',
    confidenceLevel: 5,
    lastReviewed: '2024-01-18',
    reviewStatus: 'mastered'
  },
  {
    id: '3',
    title: '複利',
    category: '金融',
    summary: '元本と累積利息に対して計算される利息',
    explanation: '複利とは、元本と過去の期間から累積された利息の両方に基づいて計算されるローンまたは預金の利息です。',
    myUnderstanding: 'お金がお金を生む仕組み。投資の雪だるま効果。時間が最も重要な変数。',
    relatedTerms: ['単利', '元本', '年利回り'],
    relatedConcepts: ['お金の時間価値', '投資成長'],
    examples: ['10万円を年利10%で10年間運用：複利では約25.9万円、単利では20万円'],
    notes: 'アインシュタインは「人類最大の発明」と呼んだと言われている。',
    confidenceLevel: 5,
    lastReviewed: '2024-01-20',
    reviewStatus: 'mastered'
  },
  {
    id: '4',
    title: 'インフレーション',
    category: '経済',
    summary: '物価の上昇と購買力の低下',
    explanation: 'インフレーションとは、商品やサービスの一般的な価格水準が上昇し、結果として通貨の購買力が低下する率のことです。',
    myUnderstanding: '時間とともにお金の価値が下がる現象。実質的な資産を維持するには、インフレ率を上回る投資が必要。',
    relatedTerms: ['消費者物価指数', 'デフレ', '購買力'],
    relatedConcepts: ['金利', '金融政策', '実質リターン'],
    examples: ['インフレ率3%で預金金利1%の場合、年間2%の購買力を失っている'],
    notes: '中央銀行は通常、経済成長に最適な2%のインフレ率を目標としている。',
    confidenceLevel: 3,
    lastReviewed: '2024-01-10',
    reviewStatus: 'learning'
  },
  {
    id: '5',
    title: '自己資本利益率（ROE）',
    category: 'ビジネス',
    summary: '純利益 ÷ 株主資本',
    explanation: 'ROEは、株主資本に対する企業の収益性を測定します。株主が投資したお金を使って、企業がどれだけの利益を生み出しているかを示します。',
    myUnderstanding: '企業が投資家のお金をどれだけ効率的に利益に変えているか。一般的に高いほど良いが、文脈が重要。',
    relatedTerms: ['純利益', '資本', 'ROA', 'ROIC'],
    relatedConcepts: ['収益性', 'レバレッジ', 'デュポン分析'],
    examples: ['純利益1,000万円、資本5,000万円の企業のROEは20%'],
    notes: '負債が多い（資本が少ない）と人工的に高くなる可能性がある。',
    confidenceLevel: 2,
    lastReviewed: '2024-01-05',
    reviewStatus: 'learning'
  },
  {
    id: '6',
    title: 'キャッシュフロー',
    category: '金融',
    summary: '事業に出入りする現金の純額',
    explanation: 'キャッシュフローとは、特定の時点でビジネスに出入りする現金の純残高を指します。プラスのキャッシュフローは、出ていくお金より入ってくるお金が多いことを意味します。',
    myUnderstanding: 'あらゆる投資の生命線。帳簿上の利益は請求書を払えなければ意味がない。',
    relatedTerms: ['営業キャッシュフロー', 'フリーキャッシュフロー', 'キャッシュフロー計算書'],
    relatedConcepts: ['流動性', '運転資本', '収益'],
    examples: ['賃貸物件：家賃20万円 − ローン8万円 − 経費4万円 = 月間キャッシュフロー8万円'],
    notes: 'キャッシュフローがプラスでも利益が出ているとは限らず、その逆も然り。',
    confidenceLevel: 4,
    lastReviewed: '2024-01-17',
    reviewStatus: 'reviewing'
  },
  {
    id: '7',
    title: '営業利益率',
    category: 'ビジネス',
    summary: '営業利益 ÷ 売上高',
    explanation: '営業利益率は、企業の売上高のうち、賃金や原材料などの変動費を支払った後に残る割合を測定します。',
    myUnderstanding: '利息と税金の前に、企業がコア事業をどれだけ効率的に運営しているかを示す。',
    relatedTerms: ['粗利率', '純利益率', 'EBITDA'],
    relatedConcepts: ['効率性', 'コスト構造', '価格決定力'],
    examples: ['売上高1億円、営業利益2,000万円の企業の営業利益率は20%'],
    notes: '意味のある分析のためには、同じ業界内で比較する。',
    confidenceLevel: 3,
    lastReviewed: '2024-01-12',
    reviewStatus: 'learning'
  },
  {
    id: '8',
    title: '金利',
    category: '経済',
    summary: 'お金を借りるコスト（パーセンテージ）',
    explanation: '金利とは、貸し手が借り手に請求する金額であり、元本（貸し出された金額）のパーセンテージです。金利は消費者支出、企業投資、全体的な経済活動に影響を与えます。',
    myUnderstanding: 'お金の価格。金利が上がると借り入れコストが上昇し、資産価格は下落する傾向がある。',
    relatedTerms: ['政策金利', 'プライムレート', '年利'],
    relatedConcepts: ['インフレ', '金融政策', '債券利回り'],
    examples: ['3,000万円の住宅ローン、金利7%の場合、初年度の利息コストは約210万円'],
    notes: '中央銀行は経済管理の主要ツールとして金利を使用する。',
    confidenceLevel: 4,
    lastReviewed: '2024-01-19',
    reviewStatus: 'reviewing'
  }
]

export const sampleLearningLogs: LearningLogEntry[] = [
  {
    id: '1',
    date: '2024-01-20',
    whatILearned: 'キャップレートと金利の関係を調べた。金利が上昇すると、投資家がより高い借入コストを補うために高いリターンを要求するため、キャップレートも上昇する傾向がある。',
    whatIDontUnderstand: '機関投資家は、金利変動からキャップレート調整までのタイムラグをどのようにモデル化しているのか？',
    nextTopicToStudy: 'キャップレートの圧縮・拡大サイクル',
    reflection: '不動産指標の相互関連性が明確になってきた。すべては資本コストに帰結する。',
    categoryTags: ['不動産', '経済']
  },
  {
    id: '2',
    date: '2024-01-19',
    whatILearned: 'ROEを3つの要素（利益率、資産回転率、財務レバレッジ）に分解するデュポン分析の枠組みを学んだ。',
    whatIDontUnderstand: 'デュポン分析において、高いレバレッジが許容される場合と過度なリスクを示す場合の境界線はどこか？',
    nextTopicToStudy: '異なる業界間でのROE比較',
    reflection: 'デュポン分析が強力なのは、リターンの最終結果だけでなく、「どのように」達成されたかを示すからだ。',
    categoryTags: ['ビジネス', '金融']
  },
  {
    id: '3',
    date: '2024-01-18',
    whatILearned: '営業レバレッジの概念を復習した。固定費が収益の変化に対して利益と損失の両方をどのように増幅するか。',
    whatIDontUnderstand: '企業は異なる経済環境において、固定費と変動費のバランスをどのように最適化しているのか？',
    nextTopicToStudy: '財務レバレッジ vs 営業レバレッジ',
    reflection: '高い営業レバレッジは諸刃の剣。成長期には素晴らしいが、景気後退時は危険。',
    categoryTags: ['ビジネス']
  }
]

export const conceptNodes: ConceptNode[] = [
  { id: 'interest-rate', label: '金利', category: '経済', x: 400, y: 100 },
  { id: 'inflation', label: 'インフレ', category: '経済', x: 200, y: 100 },
  { id: 'cap-rate', label: 'キャップレート', category: '不動産', x: 500, y: 250 },
  { id: 'real-estate-price', label: '不動産価格', category: '不動産', x: 300, y: 250 },
  { id: 'noi', label: 'NOI', category: '不動産', x: 500, y: 400 },
  { id: 'cash-flow', label: 'キャッシュフロー', category: '金融', x: 300, y: 400 },
  { id: 'roe', label: 'ROE', category: 'ビジネス', x: 100, y: 300 },
  { id: 'operating-profit', label: '営業利益', category: 'ビジネス', x: 100, y: 450 }
]

export const conceptEdges: ConceptEdge[] = [
  { from: 'interest-rate', to: 'cap-rate', relationship: '影響する' },
  { from: 'interest-rate', to: 'real-estate-price', relationship: '逆相関' },
  { from: 'inflation', to: 'interest-rate', relationship: '変動要因' },
  { from: 'cap-rate', to: 'real-estate-price', relationship: '決定する' },
  { from: 'noi', to: 'cap-rate', relationship: '算出に使用' },
  { from: 'noi', to: 'cash-flow', relationship: '構成要素' },
  { from: 'cash-flow', to: 'roe', relationship: '影響する' },
  { from: 'operating-profit', to: 'roe', relationship: '構成要素' },
  { from: 'operating-profit', to: 'noi', relationship: '類似概念' }
]

export const weeklyActivity: WeeklyActivity[] = [
  { day: '月', minutes: 45 },
  { day: '火', minutes: 30 },
  { day: '水', minutes: 60 },
  { day: '木', minutes: 20 },
  { day: '金', minutes: 50 },
  { day: '土', minutes: 90 },
  { day: '日', minutes: 40 }
]
