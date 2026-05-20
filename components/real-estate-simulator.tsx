'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign,
  Percent,
  Building2,
  Wallet
} from 'lucide-react'
import { SimulatorInputs, SimulatorOutputs } from '@/lib/types'

export function RealEstateSimulator() {
  const [inputs, setInputs] = useState<SimulatorInputs>({
    propertyPrice: 50000000,
    monthlyRent: 350000,
    vacancyRate: 5,
    operatingExpenses: 80000,
    propertyTax: 50000,
    loanAmount: 40000000,
    interestRate: 1.5,
    loanTermYears: 35
  })

  const outputs = useMemo<SimulatorOutputs>(() => {
    const annualRent = inputs.monthlyRent * 12
    const effectiveGrossIncome = annualRent * (1 - inputs.vacancyRate / 100)
    const annualOperatingExpenses = inputs.operatingExpenses * 12
    const annualPropertyTax = inputs.propertyTax * 12
    const totalExpenses = annualOperatingExpenses + annualPropertyTax
    
    const noi = effectiveGrossIncome - totalExpenses
    const grossYield = (annualRent / inputs.propertyPrice) * 100
    const netYield = (noi / inputs.propertyPrice) * 100

    // Monthly loan payment calculation (P&I)
    const monthlyRate = inputs.interestRate / 100 / 12
    const numPayments = inputs.loanTermYears * 12
    const monthlyLoanPayment = inputs.loanAmount > 0
      ? (inputs.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0

    const monthlyCashFlow = (noi / 12) - monthlyLoanPayment
    const annualCashFlow = monthlyCashFlow * 12

    return {
      grossYield,
      netYield,
      noi,
      monthlyLoanPayment,
      monthlyCashFlow,
      annualCashFlow
    }
  }, [inputs])

  const handleInputChange = (field: keyof SimulatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0
    setInputs(prev => ({ ...prev, [field]: numValue }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              物件情報
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="propertyPrice" className="text-sm text-muted-foreground">
                  物件価格
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">¥</span>
                  <Input
                    id="propertyPrice"
                    type="number"
                    value={inputs.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                    className="pl-7 bg-secondary border-border"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="monthlyRent" className="text-sm text-muted-foreground">
                  月額家賃
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">¥</span>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={inputs.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="pl-7 bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vacancyRate" className="text-sm text-muted-foreground">
                  空室率
                </Label>
                <div className="relative mt-1.5">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="vacancyRate"
                    type="number"
                    value={inputs.vacancyRate}
                    onChange={(e) => handleInputChange('vacancyRate', e.target.value)}
                    className="pl-9 bg-secondary border-border"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="operatingExpenses" className="text-sm text-muted-foreground">
                  月額運営費
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">¥</span>
                  <Input
                    id="operatingExpenses"
                    type="number"
                    value={inputs.operatingExpenses}
                    onChange={(e) => handleInputChange('operatingExpenses', e.target.value)}
                    className="pl-7 bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="propertyTax" className="text-sm text-muted-foreground">
                月額固定資産税
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">¥</span>
                <Input
                  id="propertyTax"
                  type="number"
                  value={inputs.propertyTax}
                  onChange={(e) => handleInputChange('propertyTax', e.target.value)}
                  className="pl-7 bg-secondary border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financing Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-chart-2" />
              融資条件
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="loanAmount" className="text-sm text-muted-foreground">
                借入額
              </Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">¥</span>
                <Input
                  id="loanAmount"
                  type="number"
                  value={inputs.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="pl-7 bg-secondary border-border"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                頭金：{formatCurrency(inputs.propertyPrice - inputs.loanAmount)} 
                （{((inputs.propertyPrice - inputs.loanAmount) / inputs.propertyPrice * 100).toFixed(0)}%）
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="interestRate" className="text-sm text-muted-foreground">
                  金利
                </Label>
                <div className="relative mt-1.5">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.125"
                    value={inputs.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    className="pl-9 bg-secondary border-border"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="loanTermYears" className="text-sm text-muted-foreground">
                  借入期間（年）
                </Label>
                <Input
                  id="loanTermYears"
                  type="number"
                  value={inputs.loanTermYears}
                  onChange={(e) => handleInputChange('loanTermYears', e.target.value)}
                  className="mt-1.5 bg-secondary border-border"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Output Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            計算結果
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">表面利回り</p>
              <p className="text-xl font-semibold text-chart-1">{formatPercent(outputs.grossYield)}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">実質利回り</p>
              <p className="text-xl font-semibold text-chart-2">{formatPercent(outputs.netYield)}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">NOI</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(outputs.noi)}</p>
              <p className="text-xs text-muted-foreground">/年</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">ローン返済額</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(outputs.monthlyLoanPayment)}</p>
              <p className="text-xs text-muted-foreground">/月</p>
            </div>
            <div className={`rounded-lg p-4 text-center ${outputs.monthlyCashFlow >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <p className="text-xs text-muted-foreground mb-1">月間キャッシュフロー</p>
              <p className={`text-xl font-semibold ${outputs.monthlyCashFlow >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(outputs.monthlyCashFlow)}
              </p>
            </div>
            <div className={`rounded-lg p-4 text-center ${outputs.annualCashFlow >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <p className="text-xs text-muted-foreground mb-1">年間キャッシュフロー</p>
              <p className={`text-xl font-semibold ${outputs.annualCashFlow >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(outputs.annualCashFlow)}
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">自己資本利回り（CCR）</span>
              <Badge variant="outline" className="font-mono">
                {formatPercent(outputs.annualCashFlow / (inputs.propertyPrice - inputs.loanAmount) * 100)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">キャップレート</span>
              <Badge variant="outline" className="font-mono">
                {formatPercent(outputs.noi / inputs.propertyPrice * 100)}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">返済余裕率（DSCR）</span>
              <Badge variant="outline" className={`font-mono ${
                outputs.noi / (outputs.monthlyLoanPayment * 12) >= 1.25 
                  ? 'bg-success/10 text-success border-success/30' 
                  : 'bg-warning/10 text-warning border-warning/30'
              }`}>
                {(outputs.noi / (outputs.monthlyLoanPayment * 12)).toFixed(2)}倍
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
