'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  Library, 
  Calculator, 
  BookOpen, 
  Network,
  Menu,
  X,
  BookMarked
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Section = 'dashboard' | 'cards' | 'simulator' | 'log' | 'map'

interface AppSidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

const navItems = [
  { id: 'dashboard' as Section, label: 'ダッシュボード', icon: LayoutDashboard },
  { id: 'cards' as Section, label: '知識カード', icon: Library },
  { id: 'simulator' as Section, label: '不動産シミュレーター', icon: Calculator },
  { id: 'log' as Section, label: '学習ログ', icon: BookOpen },
  { id: 'map' as Section, label: '概念マップ', icon: Network },
]

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-200 ease-in-out",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
              <BookMarked className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-sidebar-foreground text-sm">資産学習</h1>
              <p className="text-xs text-muted-foreground">ノートブック</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onSectionChange(item.id)
                      setMobileOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeSection === item.id
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-sidebar-border">
            <p className="text-xs text-muted-foreground">
              ローカルファースト学習アプリ
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
